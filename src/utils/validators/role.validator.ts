import * as Joi from 'joi';
import { Request } from 'express';

class RoleValidator {
   constructor() {}

   //
   public role(req: Request) {
      const schema = Joi.object({
         id: Joi.allow(),
         name: Joi.string().required()
      });
      return schema.validate(req);
   }
}

export default new RoleValidator();
