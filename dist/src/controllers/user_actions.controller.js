"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const notification_controller_1 = __importDefault(require("./notification.controller"));
const list_database_1 = require("../database/list.database");
const typeorm_1 = require("typeorm");
const index_1 = require("./../index");
class UserActionsController {
    /**
     * CenterActions
     */
    async CenterActions(body, ACTIONS_SCHEMA, actionNameID) {
        const { userID, actionID } = body;
        // Init DB
        const ACTIONS = ACTIONS_SCHEMA;
        const UserAction = await ACTIONS_SCHEMA.findOne({
            where: { userId: userID, [actionNameID]: actionID },
        });
        let ACTIONS_CONTENT;
        if (!UserAction) {
            const newCreated = ACTIONS.create({
                userId: Number(userID),
                [actionNameID]: Number(actionID),
            });
        }
        else {
            ACTIONS_CONTENT = await ACTIONS.softDelete({ id: UserAction?.id });
        }
        return { ACTIONS_CONTENT };
    }
    /**
     * Disinterested
     * Created
     */
    async PostSeftLess(req, res) {
        try {
            const { postId } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            const Post = (0, list_database_1.DbList)().DbPost;
            const SelflessPost = (0, list_database_1.DbList)().DbPostUserSelfless;
            const SPost = await SelflessPost.findOne({
                where: {
                    postId: (0, typeorm_1.In)([postId]),
                },
            });
            let savaSPost = null;
            let deletePost = null;
            // Delete Selfless Post
            if (SPost) {
                deletePost = await SelflessPost.softDelete({
                    id: Number(SPost?.id),
                });
            }
            else {
                // Create Selfless Post
                const newSPost = SelflessPost.create({
                    postId,
                    userId: Number(Auth.user?.id),
                });
                savaSPost = await SelflessPost.save(newSPost);
            }
            if (!savaSPost && !deletePost)
                return server_error_1.default.notInsertToDatabase(res);
            res.status(201).send({
                selflessPost: savaSPost,
                is: savaSPost ? 'created' : deletePost ? 'delete' : null,
            });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    /**
     * CenterActions
     */
    async Follow(req, res) {
        // try {
        // Get All Data
        const { followUserId } = req.body;
        const { Auth } = await user_services_1.default.current(req, res);
        const Follow = await (0, list_database_1.DbList)().DbUserFollow.findOne({
            where: { userId: Auth.user?.id, followerId: followUserId },
        });
        let saveFollow;
        let saveFollowStop;
        if (!Follow) {
            console.log(Auth.user?.id, followUserId, Follow);
            const newCreated = (0, list_database_1.DbList)().DbUserFollow.create({
                userId: Number(Auth.user?.id),
                followerId: followUserId,
            });
            saveFollow = await (0, list_database_1.DbList)().DbUserFollow?.save(newCreated);
        }
        else {
            saveFollowStop = await (0, list_database_1.DbList)().DbUserFollow.softDelete({
                id: Follow?.id,
            });
        }
        // Get User
        const GeTUserFollow = await (0, list_database_1.DbList)().DbUserFollow.findOne({
            where: { followerId: followUserId },
            relations: { user: { profile: true }, follower: true },
        });
        if (saveFollow) {
            notification_controller_1.default.create(req, res, {
                content: null,
                redirect: GeTUserFollow?.user.profile.slug,
                userId: GeTUserFollow?.user?.id,
                typeId: saveFollow ? 2 : 5,
            });
        }
        // Notifications follow Users
        index_1.io.emit('Notification_follow_for_user', followUserId);
        if (!saveFollow)
            return server_error_1.default.notInsertToDatabase(res);
        return res.status(201).send({ follow: saveFollow });
    }
    // catch (error) {
    //    console.log(error);
    //    serverError.catchError(res, req);
    // }
    // }
    /**
     * CenterActions
     */
    async Star(req, res) { }
    /**
     * CenterActions
     */
    async Loock(req, res) { }
    /**
     * CenterActions
     */
    async Signal(req, res) { }
}
exports.default = new UserActionsController();
