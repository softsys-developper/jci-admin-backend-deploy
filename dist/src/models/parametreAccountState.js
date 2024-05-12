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
exports.ParametreAccountState = void 0;
const typeorm_1 = require("typeorm");
const userAccountState_1 = require("./userAccountState");
let ParametreAccountState = class ParametreAccountState {
    'id';
    'name';
    'slug';
    'userAccountState';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.ParametreAccountState = ParametreAccountState;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ParametreAccountState.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ParametreAccountState.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ParametreAccountState.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userAccountState_1.UserAccountState, (params) => params, { cascade: true }),
    __metadata("design:type", Array)
], ParametreAccountState.prototype, "userAccountState", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ParametreAccountState.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ParametreAccountState.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ParametreAccountState.prototype, "deletedAt", void 0);
exports.ParametreAccountState = ParametreAccountState = __decorate([
    (0, typeorm_1.Entity)()
], ParametreAccountState);
