"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
const env_config_1 = require("../config/env.config");
class IndexController {
    DB(type) {
        if (type == 'activites') {
            return (0, list_database_1.DbList)().DbActivites;
        }
        else if (type == 'banners') {
            return (0, list_database_1.DbList)().DbBanners;
        }
        else if (type == 'contacts') {
            return (0, list_database_1.DbList)().DbContacts;
        }
        else if (type == 'media_sociaux') {
            return (0, list_database_1.DbList)().DbMediaSociaux;
        }
        else if (type == 'blogs') {
            return (0, list_database_1.DbList)().DbBlogs;
        }
        else {
            return (0, list_database_1.DbList)().DbUser;
        }
    }
    async index(req, res) {
        try {
            const { type } = req.body;
            const dB = new IndexController().DB(type);
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const data = await dB.find({
                where: { [type ? 'userId' : 'id']: Auth.user?.id },
            });
            res.status(201).send({ data });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const { slug } = req.body;
            res.status(201).send({});
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async update(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const Key = Object.keys(req.body);
            const Value = Object.values(req.body);
            let body = {};
            Key.forEach((el, index) => {
                body[el] = Value[index];
            });
            const DB = (0, list_database_1.DbList)().DbUser;
            let media = req.file;
            let medias;
            medias = req.files;
            // Upload Images
            if (media && body.type != 'About') {
                body.logo = env_config_1.env.HOST_CLIENT_IMAGE + '/' + media.filename;
            }
            else if (medias && body.type == 'About') {
                for (let i = 0; i < medias?.length; i++) {
                    const m = medias[i];
                    if (medias?.length == 1 && body.isC == 1) {
                        body.about_image_1 =
                            env_config_1.env.HOST_CLIENT_IMAGE + '/' + medias[0].filename;
                    }
                    else if (medias?.length == 1 && body.isC == 2) {
                        body.about_image_2 =
                            env_config_1.env.HOST_CLIENT_IMAGE + '/' + medias[0].filename;
                    }
                    else if (medias?.length == 2) {
                        body.about_image_1 =
                            env_config_1.env.HOST_CLIENT_IMAGE + '/' + medias[0].filename;
                        body.about_image_2 =
                            env_config_1.env.HOST_CLIENT_IMAGE + '/' + medias[1].filename;
                    }
                }
            }
            else {
                for (let i = 0; i < medias?.length; i++) {
                    const m = medias[i];
                    body.logo = env_config_1.env.HOST_CLIENT_IMAGE + '/' + m.filename;
                }
            }
            delete body.type;
            delete body.isC;
            await DB.update({ id: Auth.user?.id }, body);
            const company = await DB.findOne({ where: { id: Auth.user?.id } });
            res.status(201).send({ company });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new IndexController();
