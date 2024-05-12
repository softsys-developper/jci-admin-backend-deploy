import { dbx } from './index.database';
import { User } from './../models/user';
import { Headers } from '../models/headers';
import { Blogs } from '../models/blogs';
import { Activites } from '../models/activites';
import { MediaSociaux } from '../models/mediaSociaux';
import { Contacts } from '../models/contacts';
import { Banners } from '../models/banners';
import { PastsPresidents } from '../models/pasts_presidents';
import { PastsPresidentMedia } from '../models/pasts_presidentMedia';
import { Teams } from '../models/teams';
import { ActiviteMedia } from '../models/activites.media';

export const DbList = () => {
   //User
   function DbUser() {
      return dbx.getRepository(User);
   }

   //
   function DbActivites() {
      return dbx.getRepository(Activites);
   }

   //
   function DbActiviteMedia() {
      return dbx.getRepository(ActiviteMedia);
   }

   //
   function DbBlogs() {
      return dbx.getRepository(Blogs);
   }

   //
   function DbHeaders() {
      return dbx.getRepository(Headers);
   }

   //
   function DbContacts() {
      return dbx.getRepository(Contacts);
   }

   //
   function DbMediaSociaux() {
      return dbx.getRepository(MediaSociaux);
   }

   //
   function DbBanners() {
      return dbx.getRepository(Banners);
   }

   function DbPastPresidents() {
      return dbx.getRepository(PastsPresidents);
   }

   function DbPastPresidentMedia() {
      return dbx.getRepository(PastsPresidentMedia);
   }

   function DbTeams() {
      return dbx.getRepository(Teams);
   }

   return {
      DbUser: DbUser(),
      DbActivites: DbActivites(),
      DbHeaders: DbHeaders(),
      DbBlogs: DbBlogs(),
      DbContacts: DbContacts(),
      DbMediaSociaux: DbMediaSociaux(),
      DbBanners: DbBanners(),
      DbPastPresidents: DbPastPresidents(),
      DbPastPresidentMedia: DbPastPresidentMedia(),
      DbTeams: DbTeams(),
      DbActiviteMedia: DbActiviteMedia()
   };
};
