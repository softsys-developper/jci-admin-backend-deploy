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
exports.Articles = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const catalogue_1 = require("./catalogue");
const articleMedia_1 = require("./articleMedia");
const parametreCategory_1 = require("./parametreCategory");
let Articles = class Articles {
    'id';
    'title';
    'price';
    'link';
    'catalogue';
    'catalogueId';
    'description';
    'user';
    'userId';
    'category';
    'categoryId';
    'medias';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.Articles = Articles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Articles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Articles.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Articles.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Articles.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catalogue_1.Catalogues, (cat) => cat.articles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'catalogueId' }),
    __metadata("design:type", catalogue_1.Catalogues)
], Articles.prototype, "catalogue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Articles.prototype, "catalogueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], Articles.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.article, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.User)
], Articles.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Articles.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parametreCategory_1.ParametreCategory, (ParmaCaty) => ParmaCaty.article, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", parametreCategory_1.ParametreCategory)
], Articles.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Articles.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => articleMedia_1.ArticleMedia, (artMedia) => artMedia.articleMedia, { cascade: true }),
    __metadata("design:type", Array)
], Articles.prototype, "medias", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Articles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Articles.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Articles.prototype, "deletedAt", void 0);
exports.Articles = Articles = __decorate([
    (0, typeorm_1.Entity)()
], Articles);
