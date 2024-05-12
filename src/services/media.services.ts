
import { Request, Response } from 'express';
import { env } from '../config/env.config';

class MediaService {
   public async create(
      req: any,
      MediaDB: any,
      RefNameID: string,
      RefID: Number,
      storage: string
   ) {
      // Init
      
      const jMedia: any = 'DataBase';

      let FILES: any = [];
      FILES = req.files;

      if (FILES.length != 0) {
         for (let i = 0; i < FILES.length; i++) {
            const media = FILES[i];
            await jMedia.create({
               data: {
                  filename: media.filename,
                  minetype: media.mimetype,
                  size: media.size,
                  original_url:
                     env.HOST_CLIENT_IMAGE + `${storage}` + media.filename,
                  [RefNameID]: RefID
               },
            });
         }
      }

   }
}

export default new MediaService();
