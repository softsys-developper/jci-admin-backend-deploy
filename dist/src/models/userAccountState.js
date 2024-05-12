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
exports.UserAccountState = void 0;
const typeorm_1 = require("typeorm");
const parametreAccountState_1 = require("./parametreAccountState");
const user_1 = require("./user");
let UserAccountState = class UserAccountState {
    'id';
    'user';
    'userId';
    'paramsAccountState';
    'paramsAccountStateId';
    'createdAt';
    'updatedAt';
    'deletedAt';
};
exports.UserAccountState = UserAccountState;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAccountState.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.userAccountState, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.User)
], UserAccountState.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserAccountState.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parametreAccountState_1.ParametreAccountState, (params) => params.userAccountState, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'paramsAccountStateId' }),
    __metadata("design:type", user_1.User)
], UserAccountState.prototype, "paramsAccountState", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserAccountState.prototype, "paramsAccountStateId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserAccountState.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserAccountState.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UserAccountState.prototype, "deletedAt", void 0);
exports.UserAccountState = UserAccountState = __decorate([
    (0, typeorm_1.Entity)()
], UserAccountState);
