"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
const env_config_1 = require("../config/env.config");
class ActiviteController {
    async index(req, res) {
        try {
            const dB = (0, list_database_1.DbList)().DbActivites;
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const activites = await dB.find({
                where: { userId: Auth.user?.id },
                relations: { medias: true },
            });
            res.status(201).send({ activites });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async indexMedia(req, res) {
        try {
            const dB = (0, list_database_1.DbList)().DbActiviteMedia;
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const activites = await dB.find({
                where: { activites: { userId: Auth.user?.id } },
            });
            res.status(201).send({ activites });
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
            const DB = (0, list_database_1.DbList)().DbActivites;
            const newSave = DB.create({
                title,
                content,
                userId: Auth.user?.id,
            });
            const SavaActivite = await DB.save(newSave);
            if (SavaActivite) {
                let FILES = [];
                FILES = req.files;
                const DBMedia = (0, list_database_1.DbList)().DbActiviteMedia;
                if (FILES.length != 0) {
                    for (let i = 0; i < FILES.length; i++) {
                        const media = FILES[i];
                        const newMedia = DBMedia.create({
                            original_url: env_config_1.env.HOST_CLIENT_IMAGE + '/' + media.filename,
                            activiteId: SavaActivite.id,
                        });
                        await DBMedia.save(newMedia);
                    }
                }
            }
            const activite = await DB.findOne({
                where: { id: SavaActivite?.id },
                relations: { medias: true },
            });
            res.status(201).send({ activite });
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
            const DB = (0, list_database_1.DbList)().DbActivites;
            let FILES = [];
            FILES = req.files;
            const DBMedia = (0, list_database_1.DbList)().DbActiviteMedia;
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    const newMedia = DBMedia.create({
                        original_url: env_config_1.env.HOST_CLIENT_IMAGE + '/' + media.filename,
                        activiteId: id,
                    });
                    await DBMedia.save(newMedia);
                }
            }
            await DB.update({ id }, {
                title,
                content,
            });
            const activite = await DB.findOne({
                where: { id },
                relations: { medias: true },
            });
            res.status(201).send({ activite });
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
            const DB = (0, list_database_1.DbList)().DbActivites;
            const activite = await DB.delete({ id });
            res.status(201).send({ activite });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async deleteMedia(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const { id } = req.body;
            const DB = (0, list_database_1.DbList)().DbActiviteMedia;
            const activite = await DB.delete({ id });
            res.status(201).send({ activite });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new ActiviteController();
