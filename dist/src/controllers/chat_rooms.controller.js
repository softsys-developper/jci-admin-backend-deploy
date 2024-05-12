"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
const listCount_services_1 = require("./../services/listCount.services");
class ChatRoomController {
    constructor() { }
    async index(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            // Get All Data
            const ChatRooms = await (0, list_database_1.DbList)().DbChatRooms.find({
                where: [
                    { userId: Number(Auth.user?.id) },
                    { chatUserId: Number(Auth.user?.id) },
                ],
                relations: {
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                    chatUser: {
                        profile: {
                            media: true,
                        },
                    },
                    chatMessage: true,
                },
            });
            const _ChatRooms = ChatRooms.map((rooms) => {
                const countUnreadMessage = rooms.chatMessage.filter((DM) => DM.distribution == false && DM.roomId == rooms.id && DM.userId != Auth.user?.id).length;
                return {
                    ...rooms,
                    chatMessage: [rooms.chatMessage[rooms.chatMessage.length - 1]],
                    countUnreadMessage: countUnreadMessage,
                };
            });
            if (!ChatRooms)
                return server_error_1.default.noDataMatches(res);
            return res.status(201).send({ chat_rooms: _ChatRooms });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res, io) {
        try {
            // Init
            const { roomId } = req.body;
            // Init Db
            const ROOM = (0, list_database_1.DbList)().DbChatRooms;
            // Get Data
            const showChatRoom = await ROOM.findOne({
                where: { id: Number(roomId) },
                relations: {
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                    chatUser: {
                        profile: {
                            media: true,
                        },
                    },
                    chatMessage: true,
                },
            });
            return res.status(201).send({ chat_room: showChatRoom });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res, io) {
        try {
            // Init
            const { userChatRoomId } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            // Init Db
            const ROOM = (0, list_database_1.DbList)().DbChatRooms;
            const isChatRoomExist = await ROOM.findOne({
                where: {
                    userId: Number(Auth.user?.id),
                    chatUserId: userChatRoomId,
                },
            });
            if (isChatRoomExist) {
                return res
                    .status(201)
                    .send({ chat_room: null, roomId: isChatRoomExist.id });
            }
            // Create New ChatRoom
            const newChatRoom = ROOM.create({
                chatUserId: userChatRoomId,
                userId: Number(Auth.user?.id),
            });
            const saveChatRoom = await ROOM.save(newChatRoom);
            if (!saveChatRoom)
                server_error_1.default.notInsertToDatabase(res);
            // Get Data
            const GetChatRoom = await ROOM.findOne({
                where: { id: Number(saveChatRoom.id) },
                relations: {
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                    chatUser: {
                        profile: {
                            media: true,
                        },
                    },
                    chatMessage: true,
                },
            });
            if (GetChatRoom)
                io.emit('new_chat_room', GetChatRoom);
            res.status(201).send({
                chat_room: GetChatRoom,
                roomId: saveChatRoom.id,
            });
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
    async Count(Posts) {
        const { AddToList, ListOfDistributionChat } = new listCount_services_1.ListCountService();
        const { ChatDistribution } = await ListOfDistributionChat();
        const { List: GetChats } = AddToList(Posts, ChatDistribution, 'countMessages', 'post_id');
        console.log(GetChats);
        return { GetChats };
    }
}
exports.default = new ChatRoomController();
