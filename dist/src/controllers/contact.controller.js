"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const user_services_1 = __importDefault(require("../services/user.services"));
const list_database_1 = require("../database/list.database");
class ContactsController {
    async index(req, res) {
        try {
            const dB = (0, list_database_1.DbList)().DbContacts;
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const contacts = await dB.find({ where: { userId: Auth.user?.id } });
            res.status(201).send({ contacts });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async created(req, res) {
        try {
            // Init DB
            let { title, content, original_url } = req.body;
            const { Auth } = await user_services_1.default.current(req, res);
            const DB = (0, list_database_1.DbList)().DbContacts;
            const newSave = DB.create({
                icon: title,
                content,
                userId: Auth.user?.id,
            });
            const contacts = await DB.save(newSave);
            res.status(201).send({ contacts });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async updated(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            let { id, title, content, original_url } = req.body;
            const DB = (0, list_database_1.DbList)().DbContacts;
            await DB.update({ id }, {
                icon: title,
                content: content
            });
            const contacts = await DB.findOne({ where: { id } });
            res.status(201).send({ contacts });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async delete(req, res) {
        try {
            // Init DB
            const { Auth } = await user_services_1.default.current(req, res);
            const { id } = req.body;
            const DB = (0, list_database_1.DbList)().DbContacts;
            const contacts = await DB.delete({ id });
            res.status(201).send({ contacts });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new ContactsController();
