"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const list_database_1 = require("../database/list.database");
const env_config_1 = require("../config/env.config");
const user_services_1 = __importDefault(require("../services/user.services"));
const paginate_services_1 = require("../services/paginate.services");
class ArticleController {
    async index(req, res) {
        try {
            const { idCatalogue } = req.body;
            const { limit, page, dcount, search, slug } = req.body;
            const __search = search ? search : '';
            // Paginations
            const Paginations = new paginate_services_1.PaginateService();
            const { LIMIT, PAGE, DCOUNT, OFFEST } = await Paginations.body(limit, page, dcount);
            const ARTICLE = (0, list_database_1.DbList)().DbArticle;
            const [Articles, CountArticle] = await ARTICLE.findAndCount({
                where: idCatalogue ? { catalogueId: idCatalogue || null } : {},
                relations: { medias: true, category: true },
                order: { createdAt: 'desc' },
                take: LIMIT,
                skip: OFFEST,
            });
            const { Paginate } = await Paginations.all(CountArticle, Articles.length, LIMIT, PAGE, DCOUNT);
            res.status(201).send({ articles: Articles || [], paginate: Paginate });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            const { idArticle } = req.body;
            const ARTICLE = (0, list_database_1.DbList)().DbArticle;
            const article = await ARTICLE.findOne({
                where: { id: idArticle },
                relations: {
                    medias: true,
                    catalogue: { user: true, medias: true },
                },
            });
            if (!article)
                return server_error_1.default.noDataMatches500(res);
            res.send({ article });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res) {
        try {
            const { title, price, link, description, catalogueId, categoryId } = req.body;
            let FILES = [];
            FILES = req.files;
            const { Auth } = await user_services_1.default.current(req, res);
            const userId = Auth.user?.id;
            const ARTICLE = (0, list_database_1.DbList)().DbArticle;
            const ARTICLEMedia = (0, list_database_1.DbList)().DbArticleMedia;
            const newArticle = ARTICLE.create({
                title,
                price,
                link,
                description,
                catalogueId: Number(catalogueId),
                categoryId: Number(categoryId),
                userId,
            });
            const saveArticle = await ARTICLE.save(newArticle);
            console.log(newArticle);
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
            console.log(error);
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
            const { idArticle } = req.body;
            const ARTICLE = (0, list_database_1.DbList)().DbArticle;
            const article = await ARTICLE.delete({ id: idArticle });
            res.send({ article });
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
}
exports.default = new ArticleController();
