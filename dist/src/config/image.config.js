"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const moment = require("moment");
const fs_1 = __importDefault(require("fs"));
class ImageConfig {
    constructor() { }
    uploadFile() {
        // If we be in developpent
        return new ImageConfig().local('./public/storage');
    }
    uploadFileMessage() {
        // If we be in developpent
        return new ImageConfig().local('./public/storages/messages');
    }
    uploadFilePost() {
        // If we be in developpent
        return new ImageConfig().local('./public/storages/posts');
    }
    uploadFileCatalogue() {
        // If we be in developpent
        return new ImageConfig().local('./public/storages/catalogues');
    }
    uploadFileArticle() {
        // If we be in developpent
        return new ImageConfig().local('./public/storages/articles');
    }
    uploadFileProfile() {
        return new ImageConfig().local('./public/storages/profiles');
    }
    local(location) {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                fs_1.default.mkdirSync(location, { recursive: true });
                return cb(null, location);
            },
            filename: (req, file, cb) => {
                cb(null, `${moment().toDate().getTime().toString() +
                    '_' +
                    file.originalname}`.replace(/\s/g, ''));
            },
        });
        const upload = (0, multer_1.default)({
            storage: storage,
        });
        return upload;
    }
    online() { }
}
exports.default = new ImageConfig();
