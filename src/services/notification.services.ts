import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { env } from '../config/env.config';


class NotificationServices {
   public async Content(type: Number, content?: string) {
      if (type == 1) {
         //
         return content
            ? `A commencé à likider : ${content}`
            : `A commencé à likider.`;
      } else if (type == 2) {
         return `Vous suit désormais.`;
      } else if (type == 3) {
         return content
            ? `A trouvé votre likidation intéressante : ${content}`
            : `A trouvé votre likidation intéressante.`;
      } else if (type == 4) {
         return content ? `A commenté votre likidation : ${content}`
         : `A commenté votre likidation.`;
      } else if (type == 5) {
         return `A arrêté de vous suivre.`;
            
      }
   }
}

export default new NotificationServices();
