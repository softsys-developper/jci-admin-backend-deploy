"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoutes = void 0;
const banner_controller_1 = __importDefault(require("../controllers/banner.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const image_config_1 = __importDefault(require("../config/image.config"));
const BannerRoutes = (router) => {
    // user Router
    router.post('/banners', ware_verifyToken_1.wareVerifyTokenUser, banner_controller_1.default.index);
    router.post('/banner/created', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), banner_controller_1.default.created);
    router.post('/banner/updated', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), banner_controller_1.default.updated);
    router.post('/banner/delete', ware_verifyToken_1.wareVerifyTokenUser, banner_controller_1.default.delete);
    return router;
};
exports.BannerRoutes = BannerRoutes;
