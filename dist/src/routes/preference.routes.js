"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceRoutes = void 0;
const preference_controller_1 = __importDefault(require("../controllers/preference.controller"));
const PreferenceRoutes = (router) => {
    // Preference Router
    router.get('/preferences', preference_controller_1.default.index);
    router.get('/preference', preference_controller_1.default.show);
    router.post('/preference/create', preference_controller_1.default.create);
    router.patch('/preference/update', preference_controller_1.default.update);
    router.delete('/preference/delete', preference_controller_1.default.delete);
    return router;
};
exports.PreferenceRoutes = PreferenceRoutes;
