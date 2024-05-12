"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
const env_config_1 = require("../config/env.config");
class BannerController {
    async index(req, res) {
        try {
            const dB = (0, list_database_1.DbList)().DbBanners;
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const banners = await dB.find({ where: { userId: Auth.user?.id } });
            res.status(201).send({ banners });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async created(req, res) {
        try {
            // Init DB
            let { title, content, original_url } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            const DB = (0, list_database_1.DbList)().DbBanners;
            let FILES = [];
            FILES = req.files;
            console.log(FILES);
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    original_url = env_config_1.env.HOST_CLIENT_IMAGE + '/' + media.filename;
                }
            }
            const newSave = DB.create({
                title,
                content,
                original_url,
                userId: Auth.user?.id,
            });
            const banner = await DB.save(newSave);
            res.status(201).send({ banner });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async updated(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            let { id, title, content, original_url } = req.body;
            const DB = (0, list_database_1.DbList)().DbBanners;
            let FILES = [];
            FILES = req.files;
            console.log(FILES);
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    original_url = env_config_1.env.HOST_CLIENT_IMAGE + '/' + media.filename;
                }
            }
            await DB.update({ id }, {
                title,
                content,
                original_url,
            });
            const banner = await DB.findOne({ where: { id } });
            res.status(201).send({ banner });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async delete(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const { id } = req.body;
            const DB = (0, list_database_1.DbList)().DbBanners;
            const banner = await DB.delete({ id });
            res.status(201).send({ banner });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new BannerController();
