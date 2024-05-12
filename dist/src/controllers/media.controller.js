"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
class MediaController {
    async index(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async create(DataCreate) {
        try {
            // Init
            // Init DB
            // Create new account_type
            // const newPostMedia = await db.post_Media.create({
            //    data: {
            //       filename: DataCreate.filename,
            //       size: Number(DataCreate.size),
            //       original_url: DataCreate.original_url,
            //       minetype: DataCreate.minetype,
            //       postMediaId: DataCreate.postMediaId
            //    },
            // });
            //   return { newPostMedia}
        }
        catch (error) {
            console.log(error);
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
}
exports.default = new MediaController();
