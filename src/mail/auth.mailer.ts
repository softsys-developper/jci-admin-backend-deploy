import { Request, Response } from 'express';
import * as ejs from 'ejs';
import * as path from 'path';
import { mailConfiguration } from '../config/mailer.config';
import { Code } from 'typeorm';
import { env } from '../config/env.config';

class AuthMailer {
   constructor() {}

   public async MailCode(
      receivers: string | Array<string>,
      code: string
   ) {
      try {
         const data = {
            email: receivers,
            code: code
         };

         ejs.renderFile(
            path.join(__dirname, './../../templates/auth/code.auth.ejs'),
            data
         ).then((result:any) => {
            mailConfiguration(
               receivers,
               '[Likidons] Code de verification',
               result
            );
         });
      } catch (error) {
         console.log(error);
      }
   }

}

export default new AuthMailer();
