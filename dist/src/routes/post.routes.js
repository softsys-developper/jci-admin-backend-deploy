"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const image_config_1 = __importDefault(require("../config/image.config"));
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const postComment_controller_1 = __importDefault(require("../controllers/postComment.controller"));
const postInteresting_controller_1 = __importDefault(require("../controllers/postInteresting.controller"));
const user_actions_controller_1 = __importDefault(require("../controllers/user_actions.controller"));
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const postRoutes = (router) => {
    // Router
    router.post('/posts', post_controller_1.default.index);
    router.post('/post', ware_verifyToken_1.wareVerifyTokenUser, post_controller_1.default.show);
    router.post('/post/create', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFilePost().array('files_post'), post_controller_1.default.create);
    router.post('/post/update', post_controller_1.default.update);
    router.post('/post/delete', post_controller_1.default.delete);
    // Comments
    router.post('/post/comments', postComment_controller_1.default.index);
    router.post('/post/comment', postComment_controller_1.default.show);
    router.post('/post/comment/create', ware_verifyToken_1.wareVerifyTokenUser, postComment_controller_1.default.create);
    router.post('/post/comment/update', post_controller_1.default.update);
    router.delete('/post/comment/delete', post_controller_1.default.delete);
    // Actions interesting
    router.post('/post/interesting', ware_verifyToken_1.wareVerifyTokenUser, postInteresting_controller_1.default.show);
    router.post('/post/create/interesting', ware_verifyToken_1.wareVerifyTokenUser, postInteresting_controller_1.default.create);
    // No Liked Post
    router.post('/post/create/post-seft-less', ware_verifyToken_1.wareVerifyTokenUser, user_actions_controller_1.default.PostSeftLess);
    // Media
    router.post('/post/medias', ware_verifyToken_1.wareVerifyTokenUser, post_controller_1.default.Media);
    return router;
};
exports.postRoutes = postRoutes;
