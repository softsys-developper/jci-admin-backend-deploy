"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueRoutes = void 0;
const image_config_1 = __importDefault(require("../config/image.config"));
const catalogue_controller_1 = __importDefault(require("../controllers/catalogue.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const CatalogueRoutes = (router) => {
    // Catalogue Router
    router.post('/catalogues', ware_verifyToken_1.wareVerifyTokenUser, catalogue_controller_1.default.index);
    router.post('/catalogues/user', ware_verifyToken_1.wareVerifyTokenUser, catalogue_controller_1.default.indexUser);
    router.post('/catalogue/show', ware_verifyToken_1.wareVerifyTokenUser, catalogue_controller_1.default.show);
    router.post('/catalogue/create', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFileCatalogue().array('media_catalogue'), catalogue_controller_1.default.create);
    router.post('/catalogue/update', catalogue_controller_1.default.update);
    router.post('/catalogue/delete', catalogue_controller_1.default.delete);
    router.post('/catalogue/liked', catalogue_controller_1.default.liked);
    return router;
};
exports.CatalogueRoutes = CatalogueRoutes;
