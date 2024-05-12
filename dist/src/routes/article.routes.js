"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRoutes = void 0;
const image_config_1 = __importDefault(require("../config/image.config"));
const article_controller_1 = __importDefault(require("../controllers/article.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const ArticleRoutes = (router) => {
    // Catalogue Router
    router.post('/articles', ware_verifyToken_1.wareVerifyTokenUser, article_controller_1.default.index);
    router.post('/article/show', article_controller_1.default.show);
    router.post('/article/create', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFileArticle().array('media_article'), article_controller_1.default.create);
    router.post('/article/update', article_controller_1.default.update);
    router.post('/article/delete', ware_verifyToken_1.wareVerifyTokenUser, article_controller_1.default.delete);
    return router;
};
exports.ArticleRoutes = ArticleRoutes;
