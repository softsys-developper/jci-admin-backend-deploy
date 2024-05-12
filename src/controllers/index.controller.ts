import { Response, Request } from 'express';
import serverError from '../utils/err/server.error';
import userServices from '../services/user.services';
import pagination from 'prisma-extension-pagination';
import { DbList } from '../database/list.database';
import { ILike, Not } from 'typeorm';
import { User } from './../models/user';
import { PaginateService } from '../services/paginate.services';
import { env } from '../config/env.config';

class IndexController {
   private DB(type: any) {
      if (type == 'activites') {
         return DbList().DbActivites;
      } else if (type == 'banners') {
         return DbList().DbBanners;
      } else if (type == 'contacts') {
         return DbList().DbContacts;
      } else if (type == 'media_sociaux') {
         return DbList().DbMediaSociaux;
      } else if (type == 'blogs') {
         return DbList().DbBlogs;
      } else {
         return DbList().DbUser;
      }
   }

   public async index(req: Request, res: Response) {
      try {
         const { type } = req.body;

         const dB = new IndexController().DB(type);

         // Init DB
         const { Auth } = await userServices.current(req, res);

         const data = await dB.find({
            where: { [type ? 'userId' : 'id']: Auth.user?.id },
         });

         res.status(201).send({ data });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }

   public async show(req: Request, res: Response) {
      try {
         // Init DB
         const { Auth } = await userServices.current(req, res);
         const { slug } = req.body;

         res.status(201).send({});
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }

   public async update(req: Request, res: Response) {
      try {
         // Init DB
         const { Auth } = await userServices.current(req, res);

         const Key = Object.keys(req.body);
         const Value = Object.values(req.body);
         let body: any = {};

         Key.forEach((el, index) => {
            body[el] = Value[index];
         });

         const DB = DbList().DbUser;

         let media = req.file;
         let medias: any;
         medias = req.files;

         // Upload Images
         if (media && body.type != 'About') {
            body.logo = env.HOST_CLIENT_IMAGE + '/' + media.filename;
         } else if (medias && body.type == 'About') {
            for (let i = 0; i < medias?.length; i++) {
               const m = medias[i];
               if (medias?.length == 1 && body.isC == 1) {
                  body.about_image_1 =
                     env.HOST_CLIENT_IMAGE + '/' + medias[0].filename;
               } else if (medias?.length == 1 && body.isC == 2) {
                  body.about_image_2 =
                     env.HOST_CLIENT_IMAGE + '/' + medias[0].filename;
               } else if (medias?.length == 2) {
                  body.about_image_1 =
                     env.HOST_CLIENT_IMAGE + '/' + medias[0].filename;
                  body.about_image_2 =
                     env.HOST_CLIENT_IMAGE + '/' + medias[1].filename;
               }
            }
         }else{
            for (let i = 0; i < medias?.length; i++) {
               const m = medias[i];
               body.logo = env.HOST_CLIENT_IMAGE + '/' + m.filename;
            }
         }

         delete body.type;
         delete body.isC;

         await DB.update({ id: Auth.user?.id }, body);

         const company = await DB.findOne({ where: { id: Auth.user?.id } });

         res.status(201).send({ company });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }
}

export default new IndexController();
