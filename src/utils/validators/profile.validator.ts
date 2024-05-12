import * as Joi from 'joi';
import { Request } from 'express';

class ProfileValidator {
   constructor() {}

   //
   public update(req: Request) {
      const schema = Joi.object({
         id: Joi.allow(),
         name: Joi.string().required()
      });
      return schema.validate(req);
   }
}

export default new ProfileValidator();
