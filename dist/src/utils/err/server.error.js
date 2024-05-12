"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError {
    constructor() {
    }
    catchError(res, error) {
        return res.status(500).send({
            error
        });
    }
    /**
     * Data not insert to database
     */
    notInsertToDatabase(res, error = { message: "Impossible d'effectuez cette action" }) {
        return res.status(500).send({
            message: error.message,
            error: true,
            status: 500
        });
    }
    /**
    * Data not delete to database
    */
    noDataMatches(res, error = { message: "Aucune donnée ne correspond" }) {
        return res.status(404).send({
            message: error.message,
            error: true,
            status: 404
        });
    }
    /**
    * Data not delete to database
    */
    noDataMatches500(res, error = { message: "Aucune donnée ne correspond" }) {
        return res.status(500).send({
            message: error.message,
            error: true,
            status: 500
        });
    }
    /**
    * Not Access
    */
    Unauthorized(res, error = { message: "Unauthorized" }) {
        return res.status(401).send({
            message: error.message,
            error: true,
            status: 401
        });
    }
}
exports.default = new ServerError();
