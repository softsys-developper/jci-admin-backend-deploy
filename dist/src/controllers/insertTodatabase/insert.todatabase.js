"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../../utils/err/server.error"));
const list_database_1 = require("../../database/list.database");
const country_1 = require("./../../../public/providers/country");
class insertToDatabaseController {
    async Localization(req, res) {
        try {
            for (const name of country_1.Localisations) {
                const newLocalization = (0, list_database_1.DbList)().DbProviderLocalization.create({
                    name,
                });
                await (0, list_database_1.DbList)().DbProviderLocalization.save(newLocalization);
            }
            res.status(201).send({ data: 'fait!' });
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
exports.default = new insertToDatabaseController();
