"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.account_typeRoutes = void 0;
const account_type_controller_1 = __importDefault(require("../controllers/account_type.controller"));
const account_typeRoutes = (router) => {
    // Preference Router
    router.get('/account_types', account_type_controller_1.default.index);
    router.get('/account_type', account_type_controller_1.default.show);
    router.post('/account_type/create', account_type_controller_1.default.create);
    router.patch('/account_type/update', account_type_controller_1.default.update);
    router.delete('/account_type/delete', account_type_controller_1.default.delete);
    return router;
};
exports.account_typeRoutes = account_typeRoutes;
