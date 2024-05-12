"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const chat_message_controller_1 = __importDefault(require("../controllers/chat_message.controller"));
const chat_rooms_controller_1 = __importDefault(require("../controllers/chat_rooms.controller"));
const ware_verifyToken_1 = require("./../middlewares/auth/ware.verifyToken");
const distribution_controller_1 = __importDefault(require("../controllers/distribution.controller"));
const ChatRoutes = (router, io) => {
    // Rooms Router
    router.post('/chats/rooms', ware_verifyToken_1.wareVerifyTokenUser, chat_rooms_controller_1.default.index);
    router.post('/chat/rooms/show', ware_verifyToken_1.wareVerifyTokenUser, chat_rooms_controller_1.default.show);
    router.post('/chat/rooms/create', ware_verifyToken_1.wareVerifyTokenUser, (req, res) => {
        chat_rooms_controller_1.default.create(req, res, io);
    });
    router.patch('/chat/rooms/update', chat_rooms_controller_1.default.update);
    router.delete('/chat/rooms/delete', chat_rooms_controller_1.default.delete);
    // 
    router.post('/chats', ware_verifyToken_1.wareVerifyTokenUser, (req, res) => {
        chat_message_controller_1.default.index(req, res, io);
    });
    router.post('/chat/distribution', ware_verifyToken_1.wareVerifyTokenUser, (req, res) => {
        distribution_controller_1.default.ChatMessage(req, res, io);
    });
    router.post('/chat/show', chat_message_controller_1.default.show);
    router.post('/chat/create', ware_verifyToken_1.wareVerifyTokenUser, (req, res) => {
        chat_message_controller_1.default.create(req, res, io);
    });
    router.patch('/chat/update', chat_message_controller_1.default.update);
    router.delete('/chat/delete', chat_message_controller_1.default.delete);
    return router;
};
exports.ChatRoutes = ChatRoutes;
