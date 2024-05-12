"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../../utils/err/server.error"));
const user_services_1 = __importDefault(require("../../services/user.services"));
const list_database_1 = require("./../../database/list.database");
class GeneralNotification {
    async Count(req, res) {
        try {
            // Init
            const { Auth } = await user_services_1.default.current(req, res);
            const countUnreadNotifyAll = await (0, list_database_1.DbList)().DbUserNotification.countBy({
                user: {
                    following: {
                        userId: Auth.user?.id,
                    },
                },
                Acknowledgment_all: false
            });
            return res.status(201).send({ g_notification: countUnreadNotifyAll });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new GeneralNotification();
