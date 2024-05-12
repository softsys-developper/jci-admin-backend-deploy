"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wareVerifyTokenUser = void 0;
const user_services_1 = __importDefault(require("../../services/user.services"));
const server_error_1 = __importDefault(require("../../utils/err/server.error"));
const wareVerifyTokenUser = async (req, res, next) => {
    try {
        const { getTokenWebID, Auth, getToken } = await user_services_1.default.current(req, res);
        if (getTokenWebID == Auth.user?.email) {
            return next();
        }
        return server_error_1.default.Unauthorized(res);
    }
    catch (error) {
        console.log(error);
    }
};
exports.wareVerifyTokenUser = wareVerifyTokenUser;
