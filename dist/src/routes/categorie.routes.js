"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const categorie_controller_1 = __importDefault(require("../controllers/categorie.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const CategoryRoutes = (router) => {
    // Catalogue Router
    router.post('/categories', categorie_controller_1.default.index);
    router.post('/categorie', categorie_controller_1.default.show);
    router.post('/categorie/create', ware_verifyToken_1.wareVerifyTokenUser, categorie_controller_1.default.create);
    router.patch('/categorie/update', categorie_controller_1.default.update);
    router.delete('/categorie/delete', categorie_controller_1.default.delete);
    return router;
};
exports.CategoryRoutes = CategoryRoutes;
