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
exports.PostMedia = void 0;
const typeorm_1 = require("typeorm");
const post_1 = require("./post");
let PostMedia = class PostMedia {
    'id';
    'filename';
    'size';
    'minetype';
    'original_url';
    'postMedia';
    'postMediaId';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.PostMedia = PostMedia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PostMedia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostMedia.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostMedia.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostMedia.prototype, "minetype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostMedia.prototype, "original_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_1.Post, (post) => post.medias, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'postMediaId' }),
    __metadata("design:type", post_1.Post)
], PostMedia.prototype, "postMedia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostMedia.prototype, "postMediaId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PostMedia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PostMedia.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], PostMedia.prototype, "deletedAt", void 0);
exports.PostMedia = PostMedia = __decorate([
    (0, typeorm_1.Entity)()
], PostMedia);
