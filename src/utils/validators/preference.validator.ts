import * as Joi from 'joi';
import { Request } from 'express';

class PreferenceValidator {
   constructor() {}

   //
   public preference(req: Request) {
      const schema = Joi.object({
         id: Joi.allow(),
         name: Joi.string().required()
      });
      return schema.validate(req);
   }
}

export default new PreferenceValidator();
