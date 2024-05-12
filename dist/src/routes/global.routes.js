"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalRoutes = void 0;
const image_config_1 = __importDefault(require("../config/image.config"));
const index_controller_1 = __importDefault(require("../controllers/index.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const GlobalRoutes = (router) => {
    // Auth Router
    router.post('/index', index_controller_1.default.index);
    // Auth Router
    router.post('/index/updated', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('logo'), index_controller_1.default.update);
    return router;
};
exports.GlobalRoutes = GlobalRoutes;
