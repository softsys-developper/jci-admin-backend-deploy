import imageConfig from '../config/image.config';
import indexController from '../controllers/index.controller';
import { wareVerifyTokenUser } from '../middlewares/auth/ware.verifyToken';

export const GlobalRoutes = (router: any) => {

      // Auth Router
      router.post(
         '/index',
         indexController.index
      );


   // Auth Router
   router.post(
      '/index/updated',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('logo'),
      indexController.update
   );

   return router;
};
