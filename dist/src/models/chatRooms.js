"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRooms = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const chatMessage_1 = require("./chatMessage");
let ChatRooms = class ChatRooms {
    'id';
    'user';
    'userId';
    'chatUser';
    'chatUserId';
    'chatMessage';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.ChatRooms = ChatRooms;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChatRooms.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.chatRoomSender, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.User)
], ChatRooms.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatRooms.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.chatRoom, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'chatUserId' }),
    __metadata("design:type", user_1.User)
], ChatRooms.prototype, "chatUser", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatRooms.prototype, "chatUserId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chatMessage_1.ChatMessage, (message) => message.room, { cascade: true }),
    __metadata("design:type", Array)
], ChatRooms.prototype, "chatMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChatRooms.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChatRooms.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ChatRooms.prototype, "deletedAt", void 0);
exports.ChatRooms = ChatRooms = __decorate([
    (0, typeorm_1.Entity)()
], ChatRooms);
