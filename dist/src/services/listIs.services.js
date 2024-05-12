"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIsService = void 0;
const list_database_1 = require("./../database/list.database");
const typeorm_1 = require("typeorm");
class ListIsService {
    constructor() { }
    AddToIsList(MainList, toAddList, refName) {
        let List = MainList.map((l) => ({
            ...l,
            [refName]: toAddList.find((al, index) => al.userId == l.userId && al.id == l.id)
                ? true
                : false,
        }));
        return { List };
    }
    /**
     * name
     */
    async ListIsInterestingPost(userId) {
        const isInteresting = await (0, list_database_1.DbList)().DbPost.find({
            where: {
                postInteresting: {
                    userId: (0, typeorm_1.In)([userId]),
                },
            },
            select: { userId: true, id: true },
        });
        return { isInteresting };
    }
    /**
     * name
     */
    async ListIsCatalogue(userId) {
        const isCatalogue = await (0, list_database_1.DbList)().DbCatalogue.find({
            where: {
                liked: {
                    userId: (0, typeorm_1.In)([userId]),
                },
            },
            select: { userId: true, id: true },
        });
        return { isCatalogue };
    }
    /**
     * name
     */
    async ListIsCommentPost(userId) {
        const isComment = await (0, list_database_1.DbList)().DbPost.find({
            where: {
                postComment: {
                    userId: (0, typeorm_1.In)([userId]),
                },
            },
            select: { userId: true, id: true },
        });
        return { isComment };
    }
    /**
     * name
     */
    async ListIsFollow(userId) {
        const isFollow = await (0, list_database_1.DbList)().DbPost.find({
            where: {
                user: {
                    following: {
                        userId,
                    },
                },
            },
            select: { id: true, userId: true },
        });
        return { isFollow };
    }
    /**
     * name
     */
    async ListUserIsFollow(User, userId) {
        const isFollow = await (0, list_database_1.DbList)().DbUser.find({
            where: {
                following: {
                    userId
                }
            },
            select: { following: true, id: true },
        });
        User.map((u) => {
            u.isUserFollow = isFollow.find((flw) => flw.id == u.id) ? true : false;
            return {
                ...u
            };
        });
        let _isUserFollow = User;
        return { _isUserFollow };
    }
    /**
     * name
     */
    async ListUserIsFollow__Sp(PostUserId, userId) {
        const isFollow = await (0, list_database_1.DbList)().DbUser.findOne({
            where: {
                id: PostUserId,
                following: {
                    userId: userId
                }
            },
            relations: { following: true, follower: true },
            select: { follower: true, following: true, id: true },
        });
        return { isFollow };
    }
}
exports.ListIsService = ListIsService;
