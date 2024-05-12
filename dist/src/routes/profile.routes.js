"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const image_config_1 = __importDefault(require("../config/image.config"));
const profile_controller_1 = __importDefault(require("../controllers/profile.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const profileRoutes = (router) => {
    // profile Router
    router.post('/profiles', profile_controller_1.default.index);
    router.post('/profile', user_controller_1.default.show);
    router.post('/profile/update', ware_verifyToken_1.wareVerifyTokenUser, profile_controller_1.default.update);
    router.post('/profile/update/media', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFileProfile().array('media_profile'), profile_controller_1.default.updateMedia);
    router.delete('/profile/delete', ware_verifyToken_1.wareVerifyTokenUser, profile_controller_1.default.delete);
    return router;
};
exports.profileRoutes = profileRoutes;
