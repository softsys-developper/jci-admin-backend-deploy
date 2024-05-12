import * as Joi from 'joi';
import { Request } from 'express';

class AuthValidator {
   constructor() {}

   //
   public register(req: Request) {
      const schema = Joi.object({
         username: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().required(),
         name: Joi.string().required(),
         logo: Joi.allow(),
      });
      return schema.validate(req);
   }

   //
   public login(req: Request) {
      const schema = Joi.object({
         email: Joi.string().email().required(),
         password: Joi.string().required()
      });
      return schema.validate(req);
   }

   public signType(req: Request) {
      const schema = Joi.object({
         id: Joi.number().required(),
         typeId: Joi.number().required(),
         userId: Joi.number().required(),
      });
      return schema.validate(req);
   }

   public signPrefrence(req: Request) {
      const schema = Joi.object({
         preferenceIds: Joi.array().required(),
         userId: Joi.number().required(),
      });
      return schema.validate(req);
   }
}

export default new AuthValidator();
