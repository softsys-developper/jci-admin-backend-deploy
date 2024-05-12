"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
class UserController {
    async index(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const { DbUser } = (0, list_database_1.DbList)();
            const users = await DbUser.findOne({ where: { id: Auth?.user?.id } });
            res.status(201).send({ users });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const { DbUser } = (0, list_database_1.DbList)();
            const user = await DbUser.findOne({ where: { id: Auth.user?.id } });
            if (!user) {
                return server_error_1.default.noDataMatches(res);
            }
            res.status(201).send({ user });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new UserController();
