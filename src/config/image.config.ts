import multer from 'multer';
import moment = require('moment');
import fs from 'fs'

class ImageConfig {
   constructor() {}

   public uploadFile() {
      // If we be in developpent
      return new ImageConfig().local('./public/storage');
   }

   public uploadFileMessage() {
      // If we be in developpent
      return new ImageConfig().local('./public/storages/messages');
   }

   public uploadFilePost() {
      // If we be in developpent
      return new ImageConfig().local('./public/storages/posts');
   }

   public uploadFileCatalogue() {
      // If we be in developpent
      return new ImageConfig().local('./public/storages/catalogues');
   }

   public uploadFileArticle() {
      // If we be in developpent
      return new ImageConfig().local('./public/storages/articles');
   }

   public uploadFileProfile() {
      return new ImageConfig().local('./public/storages/profiles');
   }


   public local(location: any) {
      const storage = multer.diskStorage({
         destination: (req, file, cb) => {
            fs.mkdirSync(location, { recursive: true })
            return cb(null, location);
         },
         filename: (req, file, cb) => {
            cb(
               null,
               `${
                  moment().toDate().getTime().toString() +
                  '_' +
                  file.originalname
               }`.replace(/\s/g, '')
            );
         },
      });

      const upload = multer({
         storage: storage,
      });

      return upload;
   }

   online() {}
}

export default new ImageConfig();
