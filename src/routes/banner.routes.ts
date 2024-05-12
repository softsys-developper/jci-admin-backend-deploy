import bannerController from '../controllers/banner.controller';
import { wareVerifyTokenUser } from '../middlewares/auth/ware.verifyToken';
import imageConfig from '../config/image.config';

export const BannerRoutes = (router: any) => {
   // user Router
   router.post('/banners', wareVerifyTokenUser, bannerController.index);
   router.post(
      '/banner/created',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      bannerController.created
   );
   router.post(
      '/banner/updated',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      bannerController.updated
   );
   router.post('/banner/delete', wareVerifyTokenUser, bannerController.delete);

   return router;
};
