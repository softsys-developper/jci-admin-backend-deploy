"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const list_database_1 = require("../database/list.database");
class UserService {
    async current(req, res) {
        const SECRET_KEY_TOKEN = env_config_1.env.SECRET_KEY_TOKEN;
        const getToken = req.headers.authorization;
        const { DbUser } = (0, list_database_1.DbList)();
        // VERIFY IF TOKEN EXISTS
        if (!getToken) {
            return { getTokenWebID: null, Auth: { user: null }, getToken };
        }
        const verified = jsonwebtoken_1.default.verify(getToken, SECRET_KEY_TOKEN);
        req.header = verified;
        // GET ID IN TOKEN WEB
        const decodeToken = jsonwebtoken_1.default.decode(getToken, {
            complete: true,
        });
        const ID = decodeToken.payload['email'];
        const getTokenUser = await DbUser.findOne({
            where: { email: ID }
        });
        return { getTokenWebID: ID, Auth: { user: getTokenUser }, getToken };
    }
}
exports.default = new UserService();
