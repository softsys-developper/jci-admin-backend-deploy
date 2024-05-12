"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const list_database_1 = require("../database/list.database");
const user_services_1 = __importDefault(require("../services/user.services"));
const notification_controller_1 = __importDefault(require("./notification.controller"));
const index_1 = require("./../index");
class PostCommentController {
    async index(req, res, io) {
        try {
            // Init
            const { postId } = req.body;
            // Init DB
            // Get All Data
            const Comments = await (0, list_database_1.DbList)().DbPostComment.find({
                where: { postId },
                relations: {
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                },
            });
            if (Comments) {
                //
            }
            else {
                server_error_1.default.noDataMatches(res);
            }
            return res.status(201).send({ comments: Comments });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            // Init
            const { id } = req.body;
            // Init
            const COMMENT = (0, list_database_1.DbList)().DbPostComment;
            // Get Data
            const PostComment = await COMMENT.findOne({ where: { id } });
            return res.status(201).send({ comment: PostComment });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res) {
        try {
            // Init
            const { postId, content } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            // Init
            const COMMENT = (0, list_database_1.DbList)().DbPostComment;
            // Create New Chat
            const newComment = COMMENT.create({
                postId,
                content,
                userId: Number(Auth.user?.id),
            });
            const saveComment = await COMMENT.save(newComment);
            if (!saveComment)
                return server_error_1.default.notInsertToDatabase(res, {
                    message: 'Une erreur est survenu',
                });
            // Get Comments
            const GetComment = await COMMENT.findOne({
                where: { id: saveComment.id },
                relations: { user: { profile: { media: true } } },
            });
            if (GetComment) {
                // Notifications Interresting Users
                notification_controller_1.default.create(req, res, {
                    content: null,
                    redirect: GetComment?.postId,
                    userId: Number(Auth.user?.id),
                    typeId: 4,
                    postId: GetComment?.postId
                });
                index_1.io.emit('Notification_comments_for_user', Number(Auth.user?.id));
            }
            if (!saveComment)
                return server_error_1.default.noDataMatches(res);
            res.status(201).send({ comment: GetComment });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, error);
        }
    }
    async update(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
    async delete(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
}
exports.default = new PostCommentController();
