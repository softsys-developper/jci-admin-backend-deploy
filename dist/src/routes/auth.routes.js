"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const image_config_1 = __importDefault(require("../config/image.config"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const AuthRoutes = (router) => {
    // Auth Router
    router.post('/auth/signup', image_config_1.default.uploadFile().array('logo'), auth_controller_1.default.signUp);
    router.post('/auth/signin', auth_controller_1.default.signIn);
    return router;
};
exports.AuthRoutes = AuthRoutes;
