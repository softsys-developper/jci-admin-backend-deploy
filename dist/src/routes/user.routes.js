"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const userRoutes = (router) => {
    // user Router
    router.post('/users', ware_verifyToken_1.wareVerifyTokenUser, user_controller_1.default.index);
    router.post('/user/show', ware_verifyToken_1.wareVerifyTokenUser, user_controller_1.default.show);
    return router;
};
exports.userRoutes = userRoutes;
