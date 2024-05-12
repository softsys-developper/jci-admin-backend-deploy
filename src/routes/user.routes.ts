import userController from '../controllers/user.controller';
import { wareVerifyTokenUser } from '../middlewares/auth/ware.verifyToken';

export const userRoutes = (router: any) => {
   // user Router
   router.post('/users', wareVerifyTokenUser, userController.index);
   router.post('/user/show', wareVerifyTokenUser, userController.show);


   return router;
};
