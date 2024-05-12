import { Response, Request } from 'express';
import serverError from '../utils/err/server.error';
import userServices from '../services/user.services';
import pagination from 'prisma-extension-pagination';
import { DbList } from '../database/list.database';
import { ILike, Not } from 'typeorm';
import { User } from './../models/user';
import { PaginateService } from '../services/paginate.services';
import { env } from '../config/env.config';

class BannerController {
   public async index(req: Request, res: Response) {
      try {
         const dB = DbList().DbBanners;

         // Init DB
         const { Auth } = await userServices.current(req, res);

         const banners = await dB.find({ where: { userId: Auth.user?.id } });

         res.status(201).send({ banners });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }

   public async created(req: Request, res: Response) {
      try {
         // Init DB

         let { title, content, original_url } = req.body;

         const { Auth } = await userServices.current(req, res);

         const DB = DbList().DbBanners;

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
            title,
            content,
            original_url,
            userId: Auth.user?.id,
         });
         const banner = await DB.save(newSave);

         res.status(201).send({ banner });
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

         const DB = DbList().DbBanners;

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
               title,
               content,
               original_url,
            }
         );

         const banner = await DB.findOne({ where: { id } });

         res.status(201).send({ banner });
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

         const DB = DbList().DbBanners;

         const banner = await DB.delete({id})

         res.status(201).send({banner});
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }
}

export default new BannerController();
