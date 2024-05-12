"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const notification_controller_1 = __importDefault(require("../controllers/notification.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const general_notification_1 = __importDefault(require("./../controllers/notifications/general.notification"));
const NotificationRoutes = (router, io) => {
    router.post('/notifications', ware_verifyToken_1.wareVerifyTokenUser, notification_controller_1.default.index);
    router.post('/notification', ware_verifyToken_1.wareVerifyTokenUser, notification_controller_1.default.show);
    router.post('/notification/create', ware_verifyToken_1.wareVerifyTokenUser, notification_controller_1.default.create);
    router.patch('/notification/update', ware_verifyToken_1.wareVerifyTokenUser, notification_controller_1.default.update);
    router.delete('/notification/delete', ware_verifyToken_1.wareVerifyTokenUser, notification_controller_1.default.delete);
    router.post('/notifications/message_count', ware_verifyToken_1.wareVerifyTokenUser, notification_controller_1.default.Message);
    router.post('/notifications/general_count', ware_verifyToken_1.wareVerifyTokenUser, general_notification_1.default.Count);
    return router;
};
exports.NotificationRoutes = NotificationRoutes;
