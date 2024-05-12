import { Response, Request } from 'express';
import serverError from '../utils/err/server.error';
import userServices from '../services/user.services';
import pagination from 'prisma-extension-pagination';
import { DbList } from '../database/list.database';
import { ILike, Not } from 'typeorm';
import { User } from './../models/user';
import { PaginateService } from '../services/paginate.services';
import { env } from '../config/env.config';

class ActiviteController {
   public async index(req: Request, res: Response) {
      try {
         const dB = DbList().DbActivites;

         // Init DB
         const { Auth } = await userServices.current(req, res);

         const activites = await dB.find({
            where: { userId: Auth.user?.id },
            relations: { medias: true },
         });

         res.status(201).send({ activites });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }

   public async indexMedia(req: Request, res: Response) {
      try {
         const dB = DbList().DbActiviteMedia;

         // Init DB
         const { Auth } = await userServices.current(req, res);

         const activites = await dB.find({
            where: { activites: { userId: Auth.user?.id } },
         });

         res.status(201).send({ activites });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }

   public async created(req: Request, res: Response) {
      try {
         // Init DB

         let { title, content, original_url } = req.body;

         const { Auth } = await userServices.current(req, res);

         const DB = DbList().DbActivites;

         const newSave = DB.create({
            title,
            content,
            userId: Auth.user?.id,
         });
         const SavaActivite = await DB.save(newSave);

         if (SavaActivite) {
            let FILES: any = [];
            FILES = req.files;
            const DBMedia = DbList().DbActiviteMedia;
            if (FILES.length != 0) {
               for (let i = 0; i < FILES.length; i++) {
                  const media = FILES[i];

                  const newMedia = DBMedia.create({
                     original_url: env.HOST_CLIENT_IMAGE + '/' + media.filename,
                     activiteId: SavaActivite.id,
                  });
                  await DBMedia.save(newMedia);
               }
            }
         }

         const activite = await DB.findOne({
            where: { id: SavaActivite?.id },
            relations: { medias: true },
         });

         res.status(201).send({ activite });
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

         const DB = DbList().DbActivites;

         let FILES: any = [];
         FILES = req.files;
         const DBMedia = DbList().DbActiviteMedia;

         if (FILES.length != 0) {
            for (let i = 0; i < FILES.length; i++) {
               const media = FILES[i];

               const newMedia = DBMedia.create({
                  original_url: env.HOST_CLIENT_IMAGE + '/' + media.filename,
                  activiteId: id,
               });
               await DBMedia.save(newMedia);
            }
         }

         await DB.update(
            { id },
            {
               title,
               content,
            }
         );

         const activite = await DB.findOne({
            where: { id },
            relations: { medias: true },
         });

         res.status(201).send({ activite });
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

         const DB = DbList().DbActivites;

         const activite = await DB.delete({ id });

         res.status(201).send({ activite });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }

   public async deleteMedia(req: Request, res: Response) {
      try {
         // Init DB
         const { Auth } = await userServices.current(req, res);
         const { id } = req.body;

         const DB = DbList().DbActiviteMedia;

         const activite = await DB.delete({ id });

         res.status(201).send({ activite });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }
}

export default new ActiviteController();
