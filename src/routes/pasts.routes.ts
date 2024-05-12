import ppController from '../controllers/pasts.controller';
import { wareVerifyTokenUser } from '../middlewares/auth/ware.verifyToken';
import imageConfig from '../config/image.config';

export const PastPresidentRoutes = (router: any) => {
   // user Router
   router.post('/pps', wareVerifyTokenUser, ppController.index);
   router.post(
      '/pp/created',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      ppController.created
   );
   router.post(
      '/pp/updated',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      ppController.updated
   );
   router.post('/pp/delete', wareVerifyTokenUser, ppController.delete);

   return router;
};
