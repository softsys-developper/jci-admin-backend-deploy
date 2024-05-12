"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsRoutes = void 0;
const teams_controller_1 = __importDefault(require("../controllers/teams.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const image_config_1 = __importDefault(require("../config/image.config"));
const TeamsRoutes = (router) => {
    // user Router
    router.post('/teams', ware_verifyToken_1.wareVerifyTokenUser, teams_controller_1.default.index);
    router.post('/teams/created', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), teams_controller_1.default.created);
    router.post('/teams/updated', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().array('original_url'), teams_controller_1.default.updated);
    router.post('/teams/delete', ware_verifyToken_1.wareVerifyTokenUser, teams_controller_1.default.delete);
    return router;
};
exports.TeamsRoutes = TeamsRoutes;
