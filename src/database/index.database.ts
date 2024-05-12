import { env } from '../config/env.config';

import { ParametreNotification } from '../models/parametreNotification';
import { ParametrePreference } from '../models/parametrePreference';

import { User } from '../models/user';
import { UserRole } from '../models/userRole';
import { DataSource } from 'typeorm';
import { Activites } from '../models/activites';
import { Blogs } from '../models/blogs';
import { Headers } from '../models/headers';
import { MediaSociaux } from '../models/mediaSociaux';
import { Contacts } from '../models/contacts';
import { Banners } from '../models/banners';
import { PastsPresidents } from '../models/pasts_presidents';
import { Teams } from '../models/teams';
import { ActiviteMedia } from '../models/activites.media';


export const dbx = new DataSource({
   type: 'mysql',
   host: env.DB_HOST,
   port: env.DB_PORT,
   username: env.DB_USERNAME,
   password: env.DB_PASSWORD,
   database: env.DB_DATABASE,
   charset: env.DB_CHARSET,
   synchronize: true,
   logging: false,
   entities: [
      User,
      UserRole,
      ParametreNotification,
      ParametrePreference,
      Activites,
      ActiviteMedia,
      Blogs,
      MediaSociaux,
      Headers,
      Contacts,
      Banners,
      PastsPresidents,
      Teams

   ],
   subscribers: [],
   migrations: [],
});

