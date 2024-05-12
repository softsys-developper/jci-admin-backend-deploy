"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
class PreferenceController {
    async index(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res) {
        try {
            // Init
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
    async update(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
    async delete(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
}
exports.default = new PreferenceController();
