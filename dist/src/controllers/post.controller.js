"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const input_error_1 = __importDefault(require("../utils/err/input.error"));
const account_type_validator_1 = __importDefault(require("../utils/validators/account_type.validator"));
const env_config_1 = require("../config/env.config");
const post_validator_1 = __importDefault(require("../utils/validators/post.validator"));
const user_services_1 = __importDefault(require("../services/user.services"));
const notification_controller_1 = __importDefault(require("./notification.controller"));
const list_database_1 = require("./../database/list.database");
const typeorm_1 = require("typeorm");
const listCount_services_1 = require("./../services/listCount.services");
const listIs_services_1 = require("../services/listIs.services");
const medias_post_1 = require("./posts/medias.post");
const index_1 = require("./../index");
const paginate_services_1 = require("./../services/paginate.services");
class PostController extends medias_post_1.MediaPost {
    constructor() {
        super();
    }
    async index(req, res) {
        try {
            // Init DB
            const { DbPost } = (0, list_database_1.DbList)();
            const { Auth } = await user_services_1.default.current(req, res);
            const { limit, page, dcount, search, slug } = req.body;
            const __search = search ? search : '';
            const whereSlug = {
                user: { profile: { slug } },
                // postSelfless: Not([Auth.user?.id]),
            };
            const whereSearch = {
                content: (0, typeorm_1.ILike)('%' + __search + '%'),
                // postSelfless: Not([Auth.user?.id]),
            };
            // Paginations
            const Paginations = new paginate_services_1.PaginateService();
            const { LIMIT, PAGE, DCOUNT, OFFEST } = await Paginations.body(limit, page, dcount);
            // Get All Data
            let [Posts, postCount] = await DbPost.findAndCount({
                where: slug
                    ? whereSlug
                    : search
                        ? whereSearch
                        : {
                        //   selfless: {userId: Not(1)},
                        },
                order: { createdAt: 'DESC' },
                relations: {
                    medias: true,
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                },
            });
            // If Data no find
            if (!Posts)
                return server_error_1.default.noDataMatches(res);
            // All Count Post
            const { GetPosts } = await new PostController().Count(Posts);
            const { GetPostsAction } = await new PostController().IsActions(GetPosts, Auth.user?.id);
            const { Paginate, DataPaginate } = await Paginations.all(postCount, GetPostsAction, LIMIT, PAGE, OFFEST, DCOUNT);
            return res
                .status(201)
                .send({ posts: DataPaginate, postCount, paginate: Paginate });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
            // Init Req
            const { slug } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            // Init DB
            const POST = (0, list_database_1.DbList)().DbPost;
            // Send
            const Posts = await POST.find({
                where: { slug },
                relations: {
                    medias: true,
                    user: {
                        profile: {
                            media: true,
                        },
                    },
                },
            });
            if (!Posts)
                return server_error_1.default.noDataMatches(res);
            // All Count Post
            const { GetPosts } = await new PostController().Count(Posts);
            const { GetPostsAction } = await new PostController().IsActions(GetPosts, Auth.user?.id);
            res.status(201).send({ post: GetPostsAction });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res) {
        try {
            // Init
            const { content, place, price, price_devise, price_option } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            const userID = Auth.user?.id;
            // Init DB
            const POST = (0, list_database_1.DbList)().DbPost;
            const POSTMedia = (0, list_database_1.DbList)().DbPostMedia;
            //  Validate request entry
            const { error } = post_validator_1.default.create(req.body);
            if (error)
                return input_error_1.default.input(res, error);
            let FILES = [];
            FILES = req.files;
            // Create Slug Value
            let slug = 'post-' + Math.floor(Math.random() * 10000);
            let isExistSlug;
            let savePost;
            do {
                isExistSlug = await POST.findOne({ where: { slug } });
            } while (slug == isExistSlug?.slug);
            if (!isExistSlug) {
                // Create new account_type
                const newPost = POST.create({
                    content,
                    place,
                    userId: userID,
                    slug: slug,
                    price,
                    price_devise,
                    price_option,
                });
                savePost = await POST.save(newPost);
            }
            if (!savePost) {
                return server_error_1.default.notInsertToDatabase(res);
            }
            let savePostMedia;
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    const newPostMedia = POSTMedia.create({
                        filename: media.filename,
                        minetype: media.mimetype,
                        size: media.size,
                        original_url: env_config_1.env.HOST_CLIENT_IMAGE + '/posts/' + media.filename,
                        postMediaId: savePost?.id,
                    });
                    savePostMedia = await POSTMedia.save(newPostMedia);
                }
            }
            if (!savePostMedia) {
                POST.delete({ id: savePost?.id });
                return server_error_1.default.notInsertToDatabase(res);
            }
            notification_controller_1.default.create(req, res, {
                content: savePost?.content,
                redirect: savePost?.slug,
                userId: userID,
                typeId: 1,
                postId: savePost?.id,
            });
            // Notifications Post Users
            index_1.io.emit('Notification_post_for_user', userID);
            return res.status(201).send({ post: savePost, slug });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, error);
        }
    }
    async update(req, res) {
        try {
            // Init
            const { name, id, content } = req.body;
            // Init DB
            //  Validate request entry
            const { error } = account_type_validator_1.default.update(req.body);
            if (error)
                return input_error_1.default.input(res, error);
            return res.status(201).send({});
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
            console.log(error);
        }
    }
    async delete(req, res) {
        try {
            const { postId } = req.body;
            const deletePost = (0, list_database_1.DbList)().DbPost.softDelete({ id: postId });
            if (!deletePost)
                return server_error_1.default.notInsertToDatabase(res);
            return res.status(201).send({ delete: deletePost, is: true });
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
    // We get All count (Comment, Interesting)
    async Count(Posts) {
        const { AddToList, ListOfInterestingPostUser, ListOfCommentPost } = new listCount_services_1.ListCountService();
        // Get Count Post Interesting
        const { Interesting } = await ListOfInterestingPostUser();
        const { List } = AddToList(Posts, Interesting, 'countInteresting', 'post_id');
        // Get Count Post Comments
        const { Comments } = await ListOfCommentPost();
        const { List: GetPosts } = AddToList(List, Comments, 'countComments', 'post_id');
        return { GetPosts };
    }
    // We verify is user Apply to the post (Comment, Interesting)
    async IsActions(Posts, userId) {
        const { AddToIsList, ListIsInterestingPost, ListIsCommentPost, ListIsFollow, } = new listIs_services_1.ListIsService();
        const { isInteresting } = await ListIsInterestingPost(userId);
        const { List: XisInteresting } = AddToIsList(Posts, isInteresting, 'isUserInteresting');
        const { isComment } = await ListIsCommentPost(userId);
        const { List: XisComment } = AddToIsList(XisInteresting, isComment, 'isUserComment');
        const { isFollow } = await ListIsFollow(userId);
        const { List: GetPostsAction } = AddToIsList(XisComment, isFollow, 'isUserFollow');
        return { GetPostsAction };
    }
}
exports.default = new PostController();
