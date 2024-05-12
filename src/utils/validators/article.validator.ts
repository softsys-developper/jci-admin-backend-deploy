import * as Joi from "joi"
import { Request } from 'express';


class ArticleValidator {
    constructor() {

    }

    // 
    public create(req: Request) {
        const schema = Joi.object({
            title: Joi.string().required(),
            price: Joi.allow(),
            description: Joi.allow(),
            link: Joi.string().regex(
               /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
            ),
            reference_of_article: Joi.allow,
            description_catalogue: Joi.string().required(),
        });
        return schema.validate(req)

    }


}

export default new ArticleValidator()
