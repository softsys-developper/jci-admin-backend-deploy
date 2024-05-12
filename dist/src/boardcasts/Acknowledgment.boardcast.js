"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcknowledgmentBoardcats = void 0;
const list_database_1 = require("../database/list.database");
const AcknowledgmentBoardcats = async (socket, io) => {
    socket.on('Notification_Acknowledgment_all', async (userID, type) => {
        const UserNotifications = (0, list_database_1.DbList)().DbUserNotification;
        const GetAck = await UserNotifications.find({
            where: {
                typeId: type,
                user: {
                    following: {
                        userId: userID,
                    },
                },
            },
        });
        if (!GetAck)
            return;
        let UpdateAck;
        for (const ack of GetAck) {
            UpdateAck = await UserNotifications.update({ id: ack?.id }, { Acknowledgment_all: true });
        }
        if (UpdateAck) {
            socket.emit('Notification_Acknowledgment_all_user', userID);
        }
    });
    socket.on('Notification_Acknowledgment', async (notifyId) => {
        const UserNotifications = (0, list_database_1.DbList)().DbUserNotification;
        let UpdateAck;
        UpdateAck = await UserNotifications.update({ id: notifyId }, { Acknowledgment: true });
        if (UpdateAck) {
            socket.emit('Notification_Acknowledgment_user', notifyId);
        }
    });
};
exports.AcknowledgmentBoardcats = AcknowledgmentBoardcats;
