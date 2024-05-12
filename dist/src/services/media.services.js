"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("../config/env.config");
class MediaService {
    async create(req, MediaDB, RefNameID, RefID, storage) {
        // Init
        const jMedia = 'DataBase';
        let FILES = [];
        FILES = req.files;
        if (FILES.length != 0) {
            for (let i = 0; i < FILES.length; i++) {
                const media = FILES[i];
                await jMedia.create({
                    data: {
                        filename: media.filename,
                        minetype: media.mimetype,
                        size: media.size,
                        original_url: env_config_1.env.HOST_CLIENT_IMAGE + `${storage}` + media.filename,
                        [RefNameID]: RefID
                    },
                });
            }
        }
    }
}
exports.default = new MediaService();
