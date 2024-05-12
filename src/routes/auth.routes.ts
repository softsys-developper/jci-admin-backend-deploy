import imageConfig from '../config/image.config';
import authController from '../controllers/auth.controller';

export const AuthRoutes = (router: any) => {
   // Auth Router
   router.post('/auth/signup', imageConfig.uploadFile().array('logo'), authController.signUp);
   router.post('/auth/signin', authController.signIn);

   return router;
};
