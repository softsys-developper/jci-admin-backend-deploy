"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
class ChatMessageController {
    constructor() { }
    async index(req, res, io) {
        try {
            // Init
            const { roomId } = req.body;
            // Init DB
            // Get All Data
            const Messages = await (0, list_database_1.DbList)().DbChatMessage.find({
                where: { roomId },
                relations: {
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                },
            });
            if (Messages) {
                //
            }
            else {
                return server_error_1.default.noDataMatches(res);
            }
            return res.status(201).send({ messages: Messages });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            // Init
            const { roomId } = req.body;
            // Init
            const MESSAGE = (0, list_database_1.DbList)().DbChatMessage;
            // Get Data
            const RoomMessage = await MESSAGE.findOne({
                where: { roomId },
                relations: { user: { profile: { media: true } } },
            });
            return res.status(201).send({ messages: RoomMessage });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res, io) {
        try {
            // Init
            const { roomId, message, toUserId } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            // Init
            const MESSAGE = (0, list_database_1.DbList)().DbChatMessage;
            // Create New Chat
            const newMessage = MESSAGE.create({
                roomId,
                message,
                toUserId,
                userId: Number(Auth.user?.id),
            });
            const saveMessage = await MESSAGE.save(newMessage);
            if (!saveMessage)
                return server_error_1.default.notInsertToDatabase(res);
            // Gets Message Create
            const GetMessage = await (0, list_database_1.DbList)().DbChatMessage.findOne({
                where: { id: saveMessage?.id },
                relations: {
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                },
            });
            if (GetMessage) {
                const chatMessage = GetMessage;
                io.emit('new_chat_message', chatMessage);
                io.emit('Distribution Message', roomId, chatMessage);
            }
            res.status(201).send({ chat_message: GetMessage });
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
exports.default = new ChatMessageController();
