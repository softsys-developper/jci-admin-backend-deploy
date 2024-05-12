import activiteController from '../controllers/portfolio.controller';
import { wareVerifyTokenUser } from '../middlewares/auth/ware.verifyToken';
import imageConfig from '../config/image.config';

export const ActiviteRoutes = (router: any) => {
   // user Router
   router.post('/activites', wareVerifyTokenUser, activiteController.index);
   router.post('/media/activites', wareVerifyTokenUser, activiteController.indexMedia);
   router.post(
      '/activite/created',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      activiteController.created
   );
   router.post(
      '/activite/updated',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      activiteController.updated
   );
   router.post('/activite/delete', wareVerifyTokenUser, activiteController.delete);
   router.post('/activite/media/delete', wareVerifyTokenUser, activiteController.deleteMedia);

   return router;
};
