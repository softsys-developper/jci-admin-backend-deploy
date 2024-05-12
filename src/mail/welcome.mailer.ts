import { Request, Response } from 'express';
import * as ejs from 'ejs';
import * as path from 'path';
import { mailConfiguration } from '../config/mailer.config';
import { Code } from 'typeorm';
import { env } from '../config/env.config';

class WelcomeMailer {
   constructor() {}

   public async Welcome(
      receivers: string | Array<string>,
      fullname: string,
      token: string
   ) {
      try {
         const data = {
            firstName: fullname,
         };
        
         ejs.renderFile(
            path.join(__dirname, '../templates/welcome.ejs'),
            data
         ).then((result) => {
            mailConfiguration(
               receivers,
               'Bienvenue sur Likidons',
               result
            );
         });
      } catch (error) {
         console.log(error);
      }
   }

}

export default new WelcomeMailer();
