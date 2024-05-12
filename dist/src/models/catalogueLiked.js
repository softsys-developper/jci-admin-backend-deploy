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
exports.CatalogueLiked = void 0;
const typeorm_1 = require("typeorm");
const post_1 = require("./post");
const catalogue_1 = require("./catalogue");
const user_1 = require("./user");
let CatalogueLiked = class CatalogueLiked {
    'id';
    'catalogue';
    'catalogueId';
    'user';
    'userId';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.CatalogueLiked = CatalogueLiked;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CatalogueLiked.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catalogue_1.Catalogues, (cat) => cat.liked, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'catalogueId' }),
    __metadata("design:type", post_1.Post)
], CatalogueLiked.prototype, "catalogue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CatalogueLiked.prototype, "catalogueId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.catalogueLiked, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.User)
], CatalogueLiked.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CatalogueLiked.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CatalogueLiked.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CatalogueLiked.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], CatalogueLiked.prototype, "deletedAt", void 0);
exports.CatalogueLiked = CatalogueLiked = __decorate([
    (0, typeorm_1.Entity)()
], CatalogueLiked);
