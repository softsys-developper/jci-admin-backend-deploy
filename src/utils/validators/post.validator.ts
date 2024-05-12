import * as Joi from "joi"
import { Request } from 'express';


class PostValidator {
    constructor() {

    }

    // 
    public create(req: Request) {
        const schema = Joi.object({
            content: Joi.allow(),
            place: Joi.allow(),
            price: Joi.allow(),
            price_devise: Joi.allow(),
            price_option: Joi.allow(),
        });
        return schema.validate(req)

    }


}

export default new PostValidator()
