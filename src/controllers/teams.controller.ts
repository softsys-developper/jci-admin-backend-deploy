import { Response, Request } from 'express';
import serverError from '../utils/err/server.error';
import userServices from '../services/user.services';
import pagination from 'prisma-extension-pagination';
import { DbList } from '../database/list.database';
import { ILike, Not } from 'typeorm';
import { User } from './../models/user';
import { PaginateService } from '../services/paginate.services';
import { env } from '../config/env.config';

class TeamsController {
   public async index(req: Request, res: Response) {
      try {
         const dB = DbList().DbTeams;

         // Init DB
         const { Auth } = await userServices.current(req, res);

         const teams = await dB.find({ where: { userId: Auth.user?.id } });

         res.status(201).send({ teams });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }

   public async created(req: Request, res: Response) {
      try {
         // Init DB

         let { title, content, original_url } = req.body;

         const { Auth } = await userServices.current(req, res);

         const DB = DbList().DbTeams;

         let FILES: any = [];
         FILES = req.files;
         console.log(FILES);
         if (FILES.length != 0) {
            for (let i = 0; i < FILES.length; i++) {
               const media = FILES[i];
               original_url = env.HOST_CLIENT_IMAGE + '/' + media.filename;
            }
         }

         const newSave = DB.create({
            name: title,
            date: content,
            original_url,
            userId: Auth.user?.id,
         });
         const teams = await DB.save(newSave);

         res.status(201).send({ teams });
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

         const DB = DbList().DbTeams;

         let FILES: any = [];
         FILES = req.files;
         console.log(FILES);
         if (FILES.length != 0) {
            for (let i = 0; i < FILES.length; i++) {
               const media = FILES[i];
               original_url = env.HOST_CLIENT_IMAGE + '/' + media.filename;
            }
         }

         await DB.update(
            { id },
            {
               name: title,
               date: content,
               original_url,
            }
         );

         const teams = await DB.findOne({ where: { id } });

         res.status(201).send({ teams });
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

         const DB = DbList().DbTeams;

         const teams = await DB.delete({ id });

         res.status(201).send({ teams });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }
}

export default new TeamsController();
