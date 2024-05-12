import contactController from '../controllers/contact.controller';
import { wareVerifyTokenUser } from '../middlewares/auth/ware.verifyToken';
import imageConfig from '../config/image.config';

export const ContactRoutes = (router: any) => {
   // user Router
   router.post('/contacts', wareVerifyTokenUser, contactController.index);
   router.post(
      '/contact/created',
      wareVerifyTokenUser,
      contactController.created
   );
   router.post(
      '/contact/updated',
      wareVerifyTokenUser,
      contactController.updated
   );
   router.post('/contact/delete', wareVerifyTokenUser, contactController.delete);

   return router;
};
