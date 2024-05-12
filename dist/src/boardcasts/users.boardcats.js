"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersBoardcats = void 0;
const UsersBoardcats = (socket, io) => {
    // notify existing users
    socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.username,
    });
    // List of all users connected
    const users = [];
    for (let [id, Socket] of io.sockets.sockets) {
        users.push({
            userID: id,
            username: socket?.username,
        });
    }
    socket.emit('users', users);
};
exports.UsersBoardcats = UsersBoardcats;
