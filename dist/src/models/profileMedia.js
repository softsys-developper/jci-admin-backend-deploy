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
exports.ProfileMedia = void 0;
const profile_1 = require("./profile");
const typeorm_1 = require("typeorm");
let ProfileMedia = class ProfileMedia {
    'id';
    'filename';
    'size';
    'minetype';
    'original_url';
    'profile';
    'profileId';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.ProfileMedia = ProfileMedia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProfileMedia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProfileMedia.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ProfileMedia.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProfileMedia.prototype, "minetype", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProfileMedia.prototype, "original_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_1.Profile, (user) => user.media, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'profileId' }),
    __metadata("design:type", profile_1.Profile)
], ProfileMedia.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProfileMedia.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProfileMedia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProfileMedia.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ProfileMedia.prototype, "deletedAt", void 0);
exports.ProfileMedia = ProfileMedia = __decorate([
    (0, typeorm_1.Entity)()
], ProfileMedia);
