"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const notification_controller_1 = __importDefault(require("./notification.controller"));
const list_database_1 = require("../database/list.database");
const index_1 = require("./../index");
class PostInterestingController {
    async index(req, res) {
        try {
            // Get All Data
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            // Get All Data
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res) {
        try {
            const { userPostID, postID, state } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            const userID = Auth.user?.id;
            // Init DB
            const PostInteresting = (0, list_database_1.DbList)().DbPostInteresting;
            const UserInteresting = await PostInteresting.findOne({
                where: { userId: userID, postId: postID },
            });
            let Interesting;
            const includes = {};
            if (!UserInteresting) {
                let newInteresting = PostInteresting.create({
                    userId: Number(userID),
                    postId: Number(postID),
                });
                Interesting = await PostInteresting.save(newInteresting);
                if (Interesting) {
                    notification_controller_1.default.create(req, res, {
                        content: null,
                        redirect: Interesting?.postId,
                        userId: userID,
                        typeId: 3,
                    });
                    // Notifications Interresting Users
                    index_1.io.emit('Notification_interresting_for_user', userID);
                }
            }
            else {
                Interesting = await PostInteresting.softDelete({
                    id: UserInteresting?.id,
                });
            }
            if (!Interesting)
                return server_error_1.default.notInsertToDatabase(res);
            res.status(201).send({ interesting: Interesting });
            // Get All Data
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new PostInterestingController();
