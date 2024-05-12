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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const postMedia_1 = require("./postMedia");
const postComment_1 = require("./postComment");
const postInteresting_1 = require("./postInteresting");
const userSelflessPost_1 = require("./userSelflessPost");
const userNotification_1 = require("./userNotification");
let Post = class Post {
    'id';
    'content';
    'published';
    'slug';
    'place';
    'price';
    'price_devise';
    'price_option';
    'user';
    'userId';
    'medias';
    'postComment';
    'postNotification';
    'isUserComment';
    'postInteresting';
    'isUserInteresting';
    'selfless';
    'isUserSelfless';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.Post = Post;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1000, nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Number)
], Post.prototype, "published", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "price_devise", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "price_option", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.post, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postMedia_1.PostMedia, (media) => media.postMedia, { cascade: true }),
    __metadata("design:type", Array)
], Post.prototype, "medias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postComment_1.PostComment, (comment) => comment.post, { cascade: true }),
    __metadata("design:type", Array)
], Post.prototype, "postComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userNotification_1.UserNotification, (notify) => notify.post, { cascade: true }),
    __metadata("design:type", Array)
], Post.prototype, "postNotification", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "isUserComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postInteresting_1.PostInteresting, (ints) => ints.post, { cascade: true }),
    __metadata("design:type", Array)
], Post.prototype, "postInteresting", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "isUserInteresting", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userSelflessPost_1.UserSelflessPost, (selfless) => selfless.userId, { cascade: true }),
    __metadata("design:type", Array)
], Post.prototype, "selfless", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "isUserSelfless", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "deletedAt", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)()
], Post);
