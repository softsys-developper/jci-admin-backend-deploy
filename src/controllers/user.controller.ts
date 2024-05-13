import { Response, Request } from 'express';
import serverError from '../utils/err/server.error';
import userServices from '../services/user.services';
import { DbList } from '../database/list.database';
import { env } from '../config/env.config';

class UserController {
   public async index(req: Request, res: Response) {
      try {
         // Init DB
         const { Auth } = await userServices.current(req, res);
         const { DbUser } = DbList();

         const users = await DbUser.findOne({where: { id: Auth?.user?.id }});

         res.status(201).send({ users });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }

   public async show(req: Request, res: Response) {
      try {
         // Init DB
         const { Auth } = await userServices.current(req, res);
         const { DbUser } = DbList();

         const user = await DbUser.findOne({ where: { id: Auth.user?.id } });

         if (!user) {
            return serverError.noDataMatches(res);
         }

         res.status(201).send({ user });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }
}

export default new UserController();
