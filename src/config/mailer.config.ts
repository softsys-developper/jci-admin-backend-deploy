import * as nodemailer from 'nodemailer';
import { env } from './env.config';

// Confiquration to connection
const transporter = nodemailer.createTransport({
   pool: env.MAIL_POOL,
   port: env.MAIL_PORT, // true for 465, false for other ports
   host: env.MAIL_HOST,
   auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD,
   },
   secure: false,
   tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
   },
});


export const mailConfiguration = (
   receivers: string | Array<string>,
   subject: string,
   template: string
) => {
   const mailData = {
      from: 'noreply@likidons.com', // sender address
      to: receivers, // list of receivers
      subject: subject,
      html: template,
   };

   transporter.sendMail(mailData, function (err:any, info:any) {
      if (err) console.log(err);
      else console.log(info);
   });
};
