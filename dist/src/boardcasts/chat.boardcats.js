"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBoardcats = void 0;
const ChatBoardcats = (socket, io) => {
    socket.on('distribution_room_message_client', (roomId, userId) => {
        io.emit('distribution_room_message', roomId);
    });
};
exports.ChatBoardcats = ChatBoardcats;
