import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { env } from '../config/env.config';

import { DbList } from '../database/list.database';

class UserService {
   public async current(req: Request, res: Response) {
      const SECRET_KEY_TOKEN: any = env.SECRET_KEY_TOKEN;
      const getToken: any = req.headers.authorization;

      const { DbUser } = DbList();

      // VERIFY IF TOKEN EXISTS
      if (!getToken) {
         return { getTokenWebID: null, Auth: { user: null }, getToken };
      }

      const verified: any = Jwt.verify(getToken, SECRET_KEY_TOKEN);
      req.header = verified;

      // GET ID IN TOKEN WEB
      const decodeToken: any = Jwt.decode(getToken, {
         complete: true,
      });

      const ID = decodeToken.payload['email'];
      const getTokenUser = await DbUser.findOne({
         where: { email: ID }
      });

      return { getTokenWebID: ID, Auth: { user: getTokenUser }, getToken };
   }
}

export default new UserService();
