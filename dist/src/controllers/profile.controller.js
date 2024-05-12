"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const env_config_1 = require("../config/env.config");
const list_database_1 = require("../database/list.database");
class ProfileController {
    async index(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            return res.status(201).send({});
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async update(req, res) {
        try {
            // Init
            const { id, username, fullname, bio, link, phone, whatsapp } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            // Init DB
            const { DbUser } = (0, list_database_1.DbList)();
            // Update Value Profile
            await (0, list_database_1.DbList)().DbUser.update({
                id: Auth.user?.id,
            }, {
                username,
            });
            await (0, list_database_1.DbList)().DbProfile.update({
                id: Auth.user?.profile.id,
            }, {
                fullname,
                bio,
                link,
                phone,
                whatsapp
            });
            const GetUserAndProfile = await (0, list_database_1.DbList)().DbUser.findOne({
                where: { id: Auth.user?.id },
                relations: { profile: { media: true }, userAccountType: true },
            });
            if (!GetUserAndProfile) {
                return res.status(201).send({ profile: null });
            }
            return res.status(201).send({ profile: GetUserAndProfile });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, error);
        }
    }
    async updateMedia(req, res) {
        try {
            // Init
            const { id } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            // Init DB
            const { DbProfileMedia } = (0, list_database_1.DbList)();
            let FILES = [];
            FILES = req.files;
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    await DbProfileMedia.update({ profileId: Auth.user?.profile.id }, {
                        filename: media.filename,
                        minetype: media.mimetype,
                        size: media.size,
                        original_url: env_config_1.env.HOST_CLIENT_IMAGE + '/profiles/' + media.filename,
                    });
                }
            }
            const Media = await (0, list_database_1.DbList)().DbProfileMedia.findOne({
                where: { profileId: Auth.user?.profile.id },
            });
            return res.status(201).send({ media: Media });
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
exports.default = new ProfileController();
