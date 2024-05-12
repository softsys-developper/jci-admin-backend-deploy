"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCountService = void 0;
const list_database_1 = require("./../database/list.database");
class ListCountService {
    constructor() { }
    AddToList(MainList, toAddList, RefName, RefId) {
        let List = MainList?.map((list) => {
            let _toAddList = toAddList.find((al, index) => list?.id == al[RefId]);
            return {
                ...list,
                [RefName]: _toAddList?.count,
            };
        });
        return { List };
    }
    /**
     * Following
     */
    async ListOfFollowing() {
        const ListOfFollowing = await (0, list_database_1.DbList)()
            .DbUser.createQueryBuilder('user')
            .leftJoinAndSelect('user.follower', 'follower')
            .select('user.id')
            .addSelect('COUNT(follower.followerId)', 'count')
            .groupBy('user.id')
            .getRawMany();
        return { ListOfFollowing };
    }
    /**
     * Followers
     */
    async ListOfFollowers() {
        const ListOfFollowers = await (0, list_database_1.DbList)()
            .DbUser.createQueryBuilder('user')
            .leftJoinAndSelect('user.following', 'following')
            .select('user.id')
            .addSelect('COUNT(following.userId)', 'count')
            .groupBy('user.id')
            .getRawMany();
        return { ListOfFollowers };
    }
    /**
     * name
     */
    async ListOfInterestingPostUser() {
        const Interesting = await (0, list_database_1.DbList)()
            .DbPost.createQueryBuilder('post')
            .leftJoinAndSelect('post.postInteresting', 'postInteresting')
            .select('post.id')
            .addSelect('COUNT(postInteresting.postId)', 'count')
            .groupBy('post.id')
            .getRawMany();
        return { Interesting };
    }
    /**
     * name
     */
    async ListOfInteresting() {
        const Interesting = await (0, list_database_1.DbList)()
            .DbUser.createQueryBuilder('user')
            .leftJoinAndSelect('user.post', 'post')
            .leftJoinAndSelect('post.postInteresting', 'postInteresting')
            .select('user.id')
            .addSelect('COUNT(postInteresting.postId)', 'count')
            .groupBy('user.id')
            .getRawMany();
        return { Interesting };
    }
    /**
     * Comments
     */
    async ListOfCommentPost() {
        const Comments = await (0, list_database_1.DbList)()
            .DbPost.createQueryBuilder('post')
            .leftJoinAndSelect('post.postComment', 'postComment')
            .select('post.id')
            .addSelect('COUNT(postComment.postId)', 'count')
            .groupBy('post.id')
            .getRawMany();
        return { Comments };
    }
    /**
     * Comments
     */
    async ListOfDistributionChat() {
        const ChatDistribution = await (0, list_database_1.DbList)()
            .DbChatRooms.createQueryBuilder('rooms')
            .leftJoinAndSelect('rooms.chatMessage', 'chatMessage')
            .select('rooms.id')
            .addSelect('COUNT(chatMessage.distribution) AS true', 'count')
            .groupBy('rooms.id')
            .getRawMany();
        return { ChatDistribution };
    }
}
exports.ListCountService = ListCountService;
