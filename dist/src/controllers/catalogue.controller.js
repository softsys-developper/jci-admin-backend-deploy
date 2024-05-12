"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
const env_config_1 = require("../config/env.config");
const paginate_services_1 = require("../services/paginate.services");
const typeorm_1 = require("typeorm");
const listIs_services_1 = require("../services/listIs.services");
class CatalogueController {
    async index(req, res) {
        try {
            const { Auth } = await user_services_1.default.current(req, res);
            const userId = Auth?.user?.id;
            const { limit, page, dcount, search, userID } = req.body;
            const __search = search ? search : '';
            // Paginations
            const Paginations = new paginate_services_1.PaginateService();
            const { LIMIT, PAGE, DCOUNT, OFFEST } = await Paginations.body(limit, page, dcount);
            // 
            const { AddToIsList, ListIsCatalogue } = new listIs_services_1.ListIsService();
            const CATALOGUE = (0, list_database_1.DbList)().DbCatalogue;
            const [Catalogues, CountCatalogue] = await CATALOGUE.findAndCount({
                where: { name: (0, typeorm_1.ILike)('%' + __search + '%'), userId: userID == 'Yes' ? userId : undefined },
                order: { createdAt: 'desc' },
                take: LIMIT,
                skip: OFFEST,
                relations: {
                    medias: true,
                    user: { profile: true },
                    articles: { medias: true },
                    liked: true
                },
            });
            // Filtrer les catalogues qui ont au moins un article
            let cataloguesWithArticles = [];
            if (userID != 'Yes') {
                cataloguesWithArticles = Catalogues.filter((catalogue) => catalogue.articles.length > 0);
            }
            else {
                cataloguesWithArticles = Catalogues;
            }
            // 
            const { isCatalogue } = await ListIsCatalogue(userId);
            const { List: CataloguesList } = AddToIsList(cataloguesWithArticles, isCatalogue, 'isCatalogue');
            const { Paginate, DataPaginate } = await Paginations.all(CountCatalogue, CataloguesList, LIMIT, PAGE, OFFEST, DCOUNT);
            return res.send({ catalogues: DataPaginate, Paginate });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async indexUser(req, res) {
        try {
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            const { Auth } = await user_services_1.default.current(req, res);
            const userId = Auth?.user?.id;
            const { idCatalogue } = req.body;
            // 
            const { AddToIsList, ListIsCatalogue } = new listIs_services_1.ListIsService();
            const CATALOGUE = (0, list_database_1.DbList)().DbCatalogue;
            const ShowCatalogue = await CATALOGUE.findOne({
                where: { id: idCatalogue },
                relations: { medias: true, liked: true },
            });
            // 
            const { isCatalogue } = await ListIsCatalogue(userId);
            const { List: CataloguesShow } = AddToIsList([ShowCatalogue], isCatalogue, 'isCatalogue');
            if (!ShowCatalogue)
                return server_error_1.default.noDataMatches500(res);
            return res.send({ catalogue: CataloguesShow[0] });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res) {
        try {
            const { name, description } = req.body;
            let FILES = [];
            FILES = req.files;
            const { Auth } = await user_services_1.default.current(req, res);
            const userID = Auth.user?.id;
            const CATALOGUE = (0, list_database_1.DbList)().DbCatalogue;
            const CATALOGUEMedia = (0, list_database_1.DbList)().DbCatalogueMedia;
            const newCatalogue = CATALOGUE.create({
                name,
                description: description,
                userId: userID,
            });
            const saveCatalogue = await CATALOGUE.save(newCatalogue);
            if (!saveCatalogue) {
                return server_error_1.default.notInsertToDatabase(res);
            }
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    const newCatalogueMedia = CATALOGUEMedia.create({
                        filename: media.filename,
                        minetype: media.mimetype,
                        size: media.size,
                        original_url: env_config_1.env.HOST_CLIENT_IMAGE + '/catalogues/' + media.filename,
                        catalogueId: saveCatalogue?.id,
                    });
                    await CATALOGUEMedia.save(newCatalogueMedia);
                }
            }
            return res.status(201).send({ catalogue: saveCatalogue });
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
            const { idCatalogue } = req.body;
            const CATALOGUE = (0, list_database_1.DbList)().DbCatalogue;
            const article = await CATALOGUE.delete({ id: idCatalogue });
            res.send({ article });
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
    //
    async liked(req, res) {
        try {
            const { userId, idCatalogue } = req.body;
            const CATALOGUE_LIKED = (0, list_database_1.DbList)().DbCatalogueLiked;
            // Verify If User already to liked Catalogue
            const IsLiked = await CATALOGUE_LIKED.findOne({
                where: { userId, catalogueId: idCatalogue },
            });
            if (IsLiked) {
                await CATALOGUE_LIKED.softDelete({
                    id: IsLiked.id,
                });
                return res.status(201).send({ catalogue_liked: 'delete' });
            }
            // Created To Liked Catalogue
            const newLiked = CATALOGUE_LIKED.create({
                userId,
                catalogueId: idCatalogue,
            });
            const saveLiked = await CATALOGUE_LIKED.save(newLiked);
            return res.status(201).send({ catalogue_liked: saveLiked });
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
}
exports.default = new CatalogueController();
