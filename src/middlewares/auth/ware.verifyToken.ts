import { NextFunction, Request, Response } from 'express';
import userServices from '../../services/user.services';
import serverError from '../../utils/err/server.error';

export const wareVerifyTokenUser = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { getTokenWebID, Auth, getToken } = await userServices.current(
         req,
         res
      );

      if (getTokenWebID == Auth.user?.email) {
         return next();
      }

      return serverError.Unauthorized(res)
   } catch (error) {
      console.log(error);
   }
};
