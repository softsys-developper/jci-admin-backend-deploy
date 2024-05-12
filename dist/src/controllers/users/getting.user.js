"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GettingUser = void 0;
const server_error_1 = __importDefault(require("../../utils/err/server.error"));
const user_services_1 = __importDefault(require("../../services/user.services"));
const list_database_1 = require("./../../database/list.database");
const typeorm_1 = require("typeorm");
class GettingUser {
    async GetUserForNew(req, res) {
        try {
            // Init
            const { postId } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            const Users = await (0, list_database_1.DbList)().DbUser.find({
                where: {
                    id: (0, typeorm_1.Not)(Number(Auth.user?.id)),
                },
                relations: {
                    userAccountType: {
                        paramsAccountType: true
                    },
                    profile: {
                        media: true
                    }
                },
                take: 20,
            });
            if (!Users)
                return server_error_1.default.noDataMatches(res);
            return res.status(201).send({ users: Users });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async AddUserForNew(req, res) {
        try {
            // Init
            const { followUserId } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            let saveFollers;
            for (let i = 0; i < followUserId.length; i++) {
                const flws = followUserId[i];
                const newFollower = (0, list_database_1.DbList)().DbUserFollow.create({
                    userId: Number(Auth.user?.id),
                    followerId: flws,
                });
                saveFollers = await (0, list_database_1.DbList)().DbUserFollow.save(newFollower);
            }
            if (!saveFollers)
                return server_error_1.default.noDataMatches(res);
            return res.status(201).send({ users: saveFollers });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.GettingUser = GettingUser;
