import teamsController from '../controllers/teams.controller';
import { wareVerifyTokenUser } from '../middlewares/auth/ware.verifyToken';
import imageConfig from '../config/image.config';

export const TeamsRoutes = (router: any) => {
   // user Router
   router.post('/teams', wareVerifyTokenUser, teamsController.index);
   router.post(
      '/teams/created',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      teamsController.created
   );
   router.post(
      '/teams/updated',
      wareVerifyTokenUser,
      imageConfig.uploadFile().array('original_url'),
      teamsController.updated
   );
   router.post('/teams/delete', wareVerifyTokenUser, teamsController.delete);

   return router;
};
