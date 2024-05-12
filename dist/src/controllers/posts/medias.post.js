"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPost = void 0;
const server_error_1 = __importDefault(require("../../utils/err/server.error"));
const user_services_1 = __importDefault(require("../../services/user.services"));
const list_database_1 = require("./../../database/list.database");
class MediaPost {
    async Media(req, res) {
        try {
            // Init
            const { postId } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            const medias = await (0, list_database_1.DbList)().DbPostMedia.find({ where: { postMediaId: postId }, relations: { postMedia: {
                        user: {
                            profile: true
                        }
                    } } });
            if (!medias)
                return server_error_1.default.noDataMatches(res);
            return res
                .status(201)
                .send({ medias: medias });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.MediaPost = MediaPost;
