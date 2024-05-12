"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PastPresidentRoutes = void 0;
const pasts_controller_1 = __importDefault(require("../controllers/pasts.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const image_config_1 = __importDefault(require("../config/image.config"));
const PastPresidentRoutes = (router) => {
    // user Router
    router.post('/pps', ware_verifyToken_1.wareVerifyTokenUser, pasts_controller_1.default.index);
    router.post('/pp/created', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), pasts_controller_1.default.created);
    router.post('/pp/updated', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), pasts_controller_1.default.updated);
    router.post('/pp/delete', ware_verifyToken_1.wareVerifyTokenUser, pasts_controller_1.default.delete);
    return router;
};
exports.PastPresidentRoutes = PastPresidentRoutes;
