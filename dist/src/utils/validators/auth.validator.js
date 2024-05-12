"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
class AuthValidator {
    constructor() { }
    //
    register(req) {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            logo: Joi.allow(),
        });
        return schema.validate(req);
    }
    //
    login(req) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        return schema.validate(req);
    }
    signType(req) {
        const schema = Joi.object({
            id: Joi.number().required(),
            typeId: Joi.number().required(),
            userId: Joi.number().required(),
        });
        return schema.validate(req);
    }
    signPrefrence(req) {
        const schema = Joi.object({
            preferenceIds: Joi.array().required(),
            userId: Joi.number().required(),
        });
        return schema.validate(req);
    }
}
exports.default = new AuthValidator();
