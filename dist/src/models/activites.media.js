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
exports.ActiviteMedia = void 0;
const typeorm_1 = require("typeorm");
const activites_1 = require("./activites");
let ActiviteMedia = class ActiviteMedia {
    'id';
    'original_url';
    'activites';
    'activiteId';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.ActiviteMedia = ActiviteMedia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActiviteMedia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ActiviteMedia.prototype, "original_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activites_1.Activites, (n) => n.medias, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'activiteId' }),
    __metadata("design:type", activites_1.Activites)
], ActiviteMedia.prototype, "activites", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ActiviteMedia.prototype, "activiteId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ActiviteMedia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ActiviteMedia.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ActiviteMedia.prototype, "deletedAt", void 0);
exports.ActiviteMedia = ActiviteMedia = __decorate([
    (0, typeorm_1.Entity)()
], ActiviteMedia);
