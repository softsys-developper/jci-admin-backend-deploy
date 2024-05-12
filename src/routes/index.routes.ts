import * as express from 'express';
const router = express.Router();
import { AuthRoutes } from './auth.routes';
import { GlobalRoutes } from './global.routes';
import { BannerRoutes } from './banner.routes';
import { PastPresidentRoutes } from './pasts.routes';
import { TeamsRoutes } from './teams.routes';
import { ContactRoutes } from './contact.routes';
import { ActiviteRoutes } from './activite.routes';
import { userRoutes } from './user.routes';


const routes = (app: any) => {
   userRoutes(router);
   AuthRoutes(router); // Auth Route
   GlobalRoutes(router);
   BannerRoutes(router);
   PastPresidentRoutes(router);
   TeamsRoutes(router);
   ContactRoutes(router)
   ActiviteRoutes(router)

   app.use('/api/', router);
};


export default routes;
