"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
class DistributionController {
    constructor() { }
    //
    async ChatMessage(req, res, io) {
        try {
            const { roomId, toUserId } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            // Init
            const MESSAGE = (0, list_database_1.DbList)().DbChatMessage;
            const MessageDistribution = await MESSAGE.update({ roomId: Number(roomId), userId: toUserId }, {
                distribution: true,
            });
            if (MessageDistribution) {
                io.emit('distribution_room_message', roomId);
            }
            res.status(200).send({ data: true, message: 'Distribution' });
        }
        catch (error) {
            console.log(error);
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
exports.default = new DistributionController();
