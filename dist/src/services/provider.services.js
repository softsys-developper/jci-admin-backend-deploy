"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const list_database_1 = require("./../database/list.database");
const typeorm_1 = require("typeorm");
class ProviderServices {
    constructor() { }
    /**
     * Likes
     */
    async Localizations(req, res) {
        try {
            const { limit, page, search } = req.body;
            const __search = search ? search : '';
            const Localization = await (0, list_database_1.DbList)().DbProviderLocalization.find({
                where: { name: (0, typeorm_1.ILike)('%' + __search + '%') },
                order: { createdAt: 'DESC' },
            });
            let __Localizations = [];
            __Localizations = Localization.filter((objet, index, self) => index === self.findIndex((t) => t['name'] === objet['name']));
            res.status(201).send({ localizations: __Localizations });
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
            console.log(error);
        }
    }
    /**
     * GetLocalFiles
     */
    GetLocalFiles() {
        // Import the File System module
        const fs = require('fs');
        // Get the root directory of the device
        const rootDirectory = fs.root;
        // Create a list of extensions for image and video files
        const extensions = ['jpg', 'png', 'mp4'];
        // Get all files in the root directory that have one of the specified extensions
        const files = fs.readdirSync(rootDirectory, { withFileTypes: true });
        // Filter the files to only include image and video files
        const imageAndVideoFiles = files.filter((file) => {
            const extension = file.name.split('.').pop();
            return extensions.includes(extension);
        });
        // Print the list of image and video files
        console.log(imageAndVideoFiles);
    }
}
exports.default = new ProviderServices();
