"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boardcats = void 0;
const chat_boardcats_1 = require("./chat.boardcats");
const users_boardcats_1 = require("./users.boardcats");
const isFollow_boardcast_1 = require("./isFollow.boardcast");
const Acknowledgment_boardcast_1 = require("./Acknowledgment.boardcast");
const Boardcats = (socket, io, app) => {
    (0, chat_boardcats_1.ChatBoardcats)(socket, io);
    (0, users_boardcats_1.UsersBoardcats)(socket, io);
    (0, isFollow_boardcast_1.IsFollowBoardcats)(socket, io);
    (0, Acknowledgment_boardcast_1.AcknowledgmentBoardcats)(socket, io);
};
exports.Boardcats = Boardcats;
