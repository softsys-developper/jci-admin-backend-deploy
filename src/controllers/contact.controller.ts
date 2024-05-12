import { Response, Request } from 'express';
import serverError from '../utils/err/server.error';
import userServices from '../services/user.services';
import pagination from 'prisma-extension-pagination';
import { DbList } from '../database/list.database';
import { ILike, Not } from 'typeorm';
import { User } from './../models/user';
import { PaginateService } from '../services/paginate.services';
import { env } from '../config/env.config';

class ContactsController {
   public async index(req: Request, res: Response) {
      try {
         const dB = DbList().DbContacts;

         // Init DB
         const { Auth } = await userServices.current(req, res);

         const contacts = await dB.find({ where: { userId: Auth.user?.id } });

         res.status(201).send({ contacts });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }

   public async created(req: Request, res: Response) {
      try {
         // Init DB

         let { title, content, original_url } = req.body;

         const { Auth } = await userServices.current(req, res);

         const DB = DbList().DbContacts;

         const newSave = DB.create({
            icon: title,
            content,
            userId: Auth.user?.id,
         });
         const contacts = await DB.save(newSave);

         res.status(201).send({ contacts });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }

   public async updated(req: Request, res: Response) {
      try {
         // Init DB
         const { Auth } = await userServices.current(req, res);
         let { id, title, content, original_url } = req.body;

         const DB = DbList().DbContacts;

         await DB.update(
            { id },
            {
               icon: title,
               content: content
            }
         );

         const contacts = await DB.findOne({ where: { id } });

         res.status(201).send({ contacts });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }

   public async delete(req: Request, res: Response) {
      try {
         // Init DB
         const { Auth } = await userServices.current(req, res);
         const { id } = req.body;

         const DB = DbList().DbContacts;

         const contacts = await DB.delete({ id });

         res.status(201).send({ contacts });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }
}

export default new ContactsController();
