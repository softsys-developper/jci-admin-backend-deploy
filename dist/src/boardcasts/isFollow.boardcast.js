"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFollowBoardcats = void 0;
const listIs_services_1 = require("./../services/listIs.services");
const IsFollowBoardcats = (socket, io) => {
    socket.on('checking_is_user_follow', async (PostUserId, userCurrentId) => {
        const { isFollow } = await new listIs_services_1.ListIsService().ListUserIsFollow__Sp(PostUserId, userCurrentId);
        if (isFollow) {
            socket.broadcast.emit('Notification_user', isFollow, isFollow);
        }
    });
};
exports.IsFollowBoardcats = IsFollowBoardcats;
