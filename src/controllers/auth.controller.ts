import { Response, Request } from 'express';
import serverError from '../utils/err/server.error';
import authValidator from '../utils/validators/auth.validator';
import inputError from '../utils/err/input.error';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import userServices from '../services/user.services';
import { DbList } from '../database/list.database';
import AuthMailer from '../mail//auth.mailer';
import crypto from 'crypto';
import { env } from '../config/env.config';

class AuthController {
   public async signUp(req: Request, res: Response) {
      try {
         // Init
         let { username, email, password, logo, name } =
            req.body;

         console.log(req.body);
         // Trim & LowerCase
         username = username.toLowerCase().trim();
         email = email.toLowerCase().trim();

         //  Init DB
         const { DbUser} = DbList();

         //  Validate request entry
         const { error } = authValidator.register(req.body);
         if (error) return inputError.input(res, error);

         //  get the user from the email
         const UserEmail = await DbUser.findOne({
            where: {
               email: email,
            },
         });

         //  get the user from the email
         const UserUsername = await DbUser.findOne({
            where: {
               username: username,
            },
         });

         //  Verify if email exist in database
         if (UserEmail) {
            return inputError.withoutInput(res, {
               message: 'Ce email est dèja utiliser.',
               code: 'ErrorAuth_1',
               path: 'email',
            });
         }

         //  Verify if Username exist in database
         if (UserUsername) {
            return inputError.withoutInput(res, {
               message: "Ce nom d'utilisateur est dèja utiliser.",
               code: 'ErrorAuth_2',
               path: 'username',
            });
         }

         //Cryp password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);

         //  Generate Token
         const SECRET_KEY_TOKEN: any = process.env.SECRET_KEY_TOKEN;
         const __TOKEN__ = Jwt.sign({ email: email }, SECRET_KEY_TOKEN);


         let FILES: any = [];
         FILES = req.files;
         if (FILES.length != 0) {
            for (let i = 0; i < FILES.length; i++) {
               const media = FILES[i];
               logo = env.HOST_CLIENT_IMAGE + '/' + media.filename
            }
         }


         // Create new user
         const newUser = DbUser.create({
            username: `${username}`,
            email: email,
            password: hashPassword,
            token: __TOKEN__,
            logo,
            name
         });
         const saveUser = await DbUser.save(newUser);

         // Send Data
         return res.status(201).send({ user: saveUser });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, req);
      }
   }

   public async signIn(req: Request, res: Response) {
      try {
         // Init
         let { email, password } = req.body;

         // Trim & LowerCase
         email = email.toLowerCase().trim();

         //  Init DB
         const { DbUser } = DbList();

         //  Validate request entry
         const { error } = authValidator.login(req.body);
         if (error) return inputError.input(res, error);
         
         //  get the user from the email
         const user = await DbUser.findOne({
            where: { email },
         });

         //  Verify if email exist in database
         if (!user) {
            return inputError.withoutInput(res, {
               message: 'Email ou mot de passe incorrect...',
               code: 'ErrorAuth_Login_1',
               path: 'email',
            });
         }

         //Cryp password
         const verifyPassword = await bcrypt.compare(password, user?.password);

         //  Verify if email exist in database
         if (!verifyPassword) {
            return inputError.withoutInput(res, {
               message: 'Email ou mot de passe incorrect...',
               code: 'ErrorAuth_Login_1',
               path: 'email',
            });
         }

         const GetUserUpdate = await DbUser.findOne({
            where: { id: user.id }
         });

         return res.status(201).send({ user: GetUserUpdate });
      } catch (error) {
         serverError.catchError(res, req);
      }
   }
}

export default new AuthController();
