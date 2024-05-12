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
exports.Catalogues = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const catalogueMedia_1 = require("./catalogueMedia");
const article_1 = require("./article");
const catalogueLiked_1 = require("./catalogueLiked");
let Catalogues = class Catalogues {
    'id';
    'name';
    'description';
    'user';
    'userId';
    'medias';
    'liked';
    'articles';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.Catalogues = Catalogues;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Catalogues.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Catalogues.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Catalogues.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.catalogue, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.User)
], Catalogues.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Catalogues.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => catalogueMedia_1.CatalogueMedia, (catMedia) => catMedia.catalogue, { cascade: true }),
    __metadata("design:type", Array)
], Catalogues.prototype, "medias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => catalogueLiked_1.CatalogueLiked, (cat) => cat.catalogue, { cascade: true }),
    __metadata("design:type", Array)
], Catalogues.prototype, "liked", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_1.Articles, (art) => art.catalogue, { cascade: true }),
    __metadata("design:type", Array)
], Catalogues.prototype, "articles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Catalogues.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Catalogues.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Catalogues.prototype, "deletedAt", void 0);
exports.Catalogues = Catalogues = __decorate([
    (0, typeorm_1.Entity)()
], Catalogues);
