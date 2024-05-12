"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const contact_controller_1 = __importDefault(require("../controllers/contact.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const ContactRoutes = (router) => {
    // user Router
    router.post('/contacts', ware_verifyToken_1.wareVerifyTokenUser, contact_controller_1.default.index);
    router.post('/contact/created', ware_verifyToken_1.wareVerifyTokenUser, contact_controller_1.default.created);
    router.post('/contact/updated', ware_verifyToken_1.wareVerifyTokenUser, contact_controller_1.default.updated);
    router.post('/contact/delete', ware_verifyToken_1.wareVerifyTokenUser, contact_controller_1.default.delete);
    return router;
};
exports.ContactRoutes = ContactRoutes;
