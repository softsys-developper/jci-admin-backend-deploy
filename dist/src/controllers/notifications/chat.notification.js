"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatNotification = void 0;
const server_error_1 = __importDefault(require("../../utils/err/server.error"));
const user_services_1 = __importDefault(require("../../services/user.services"));
const list_database_1 = require("./../../database/list.database");
const typeorm_1 = require("typeorm");
class ChatNotification {
    async Message(req, res) {
        try {
            // Init
            const { Auth } = await user_services_1.default.current(req, res);
            const countUnreadMessageAll = await (0, list_database_1.DbList)().DbChatMessage.countBy({ distribution: false, userId: (0, typeorm_1.Not)(Number(Auth.user?.id)),
            });
            return res
                .status(201)
                .send({ chat_notification: countUnreadMessageAll });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.ChatNotification = ChatNotification;
