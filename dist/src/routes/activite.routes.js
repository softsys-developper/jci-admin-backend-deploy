"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiviteRoutes = void 0;
const portfolio_controller_1 = __importDefault(require("../controllers/portfolio.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const image_config_1 = __importDefault(require("../config/image.config"));
const ActiviteRoutes = (router) => {
    // user Router
    router.post('/activites', ware_verifyToken_1.wareVerifyTokenUser, portfolio_controller_1.default.index);
    router.post('/media/activites', ware_verifyToken_1.wareVerifyTokenUser, portfolio_controller_1.default.indexMedia);
    router.post('/activite/created', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), portfolio_controller_1.default.created);
    router.post('/activite/updated', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), portfolio_controller_1.default.updated);
    router.post('/activite/delete', ware_verifyToken_1.wareVerifyTokenUser, portfolio_controller_1.default.delete);
    router.post('/activite/media/delete', ware_verifyToken_1.wareVerifyTokenUser, portfolio_controller_1.default.deleteMedia);
    return router;
};
exports.ActiviteRoutes = ActiviteRoutes;
