"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const list_database_1 = require("../database/list.database");
const env_config_1 = require("../config/env.config");
const user_services_1 = __importDefault(require("../services/user.services"));
class CategoryController {
    async index(req, res) {
        try {
            const CATEGORY = (0, list_database_1.DbList)().DbCategory;
            const GetCategory = await CATEGORY.find();
            res.status(201).send({ category: GetCategory || [] });
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
    async create(req, res) {
        try {
            const { title, price, link, catalogueId, categoryId } = req.body;
            let FILES = [];
            FILES = req.files;
            const { Auth } = await user_services_1.default.current(req, res);
            const userID = Auth.user?.id;
            const ARTICLE = (0, list_database_1.DbList)().DbArticle;
            const ARTICLEMedia = (0, list_database_1.DbList)().DbArticleMedia;
            const newArticle = ARTICLE.create({
                title,
                price,
                link,
                catalogueId,
                categoryId,
            });
            const saveArticle = await ARTICLE.save(newArticle);
            if (!saveArticle) {
                return server_error_1.default.notInsertToDatabase(res);
            }
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    const newArticleMedia = ARTICLEMedia.create({
                        filename: media.filename,
                        minetype: media.mimetype,
                        size: media.size,
                        original_url: env_config_1.env.HOST_CLIENT_IMAGE + '/articles/' + media.filename,
                        articleMediaId: saveArticle?.id,
                    });
                    await ARTICLEMedia.save(newArticleMedia);
                }
            }
            return res.status(201).send({ catalogue: saveArticle });
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
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
exports.default = new CategoryController();
