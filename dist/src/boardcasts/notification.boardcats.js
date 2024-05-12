"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyCountBoardcats = void 0;
const list_database_1 = require("../database/list.database");
const NotifyCountBoardcats = (socket, io) => {
    socket.on('notification_count_all', async (userCurrentId) => {
        const countUnreadNotifyAll = await (0, list_database_1.DbList)().DbUserNotification.countBy({
            user: {
                following: {
                    followerId: userCurrentId,
                },
            },
            Acknowledgment_all: false
        });
        io.emit("Notification_count", countUnreadNotifyAll);
    });
};
exports.NotifyCountBoardcats = NotifyCountBoardcats;
