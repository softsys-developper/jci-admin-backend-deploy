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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const activites_1 = require("./activites");
const banners_1 = require("./banners");
const blogs_1 = require("./blogs");
const mediaSociaux_1 = require("./mediaSociaux");
const contacts_1 = require("./contacts");
let User = class User {
    'id';
    'email';
    'username';
    'password';
    'token';
    'name';
    'description';
    'zone';
    // Images
    'logo';
    'about_image_1';
    'about_image_2';
    // Colors
    'color_1';
    'color_2';
    // Statisics
    'stats_1';
    'stats_2';
    'stats_3';
    'stats_4';
    // Contacts
    'contact_phone';
    'contact_mail';
    'contact_whatsapp';
    'contact_facebook';
    'contact_instagram';
    'contact_linkedin';
    'contact_x';
    'activites';
    'banners';
    'blogs';
    'media_sociaux';
    'contacts';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Abidjan, Côte divoire' }),
    __metadata("design:type", String)
], User.prototype, "zone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "about_image_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "about_image_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '#4C7DDE' }),
    __metadata("design:type", String)
], User.prototype, "color_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '#FBF66A' }),
    __metadata("design:type", String)
], User.prototype, "color_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "stats_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "stats_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "stats_3", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "stats_4", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "contact_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "contact_mail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "contact_whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "contact_facebook", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "contact_instagram", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "contact_linkedin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "contact_x", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activites_1.Activites, (n) => n.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "activites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => banners_1.Banners, (n) => n.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "banners", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blogs_1.Blogs, (n) => n.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mediaSociaux_1.MediaSociaux, (n) => n.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "media_sociaux", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contacts_1.Contacts, (n) => n.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "contacts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
