"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class useValidateError {
    constructor() {
    }
    static struct() {
    }
    /**
     * validator
     */
    input(res, error) {
        return res.status(400).send({
            message: error.details[0].message,
            code: 'Error' + error.details[0].path[0],
            path: error.details[0].path[0]
        });
    }
    /**
     * withoutInput
     */
    withoutInput(res, error) {
        return res.status(400).send({
            message: error.message,
            code: error.code,
            path: error.path
        });
    }
}
exports.default = new useValidateError();
