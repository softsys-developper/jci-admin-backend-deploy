import * as Joi from 'joi';
import { Request } from 'express';

class accountTypeValidator {
   constructor() {}

   //
   public create(req: Request) {
      const schema = Joi.object({
         id: Joi.allow(),
         name: Joi.string().required(),
         icon: Joi.string().required(),
         description: Joi.string().required(),
      });
      return schema.validate(req);
   }

   //
   public update(req: Request) {
      const schema = Joi.object({
         id: Joi.allow(),
         name: Joi.string().allow(),
         description: Joi.string().allow(),
      });
      return schema.validate(req);
   }
}

export default new accountTypeValidator();
