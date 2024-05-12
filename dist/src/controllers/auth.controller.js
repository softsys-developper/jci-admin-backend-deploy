"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const auth_validator_1 = __importDefault(require("../utils/validators/auth.validator"));
const input_error_1 = __importDefault(require("../utils/err/input.error"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const list_database_1 = require("../database/list.database");
const env_config_1 = require("../config/env.config");
class AuthController {
    async signUp(req, res) {
        try {
            // Init
            let { username, email, password, logo, name } = req.body;
            console.log(req.body);
            // Trim & LowerCase
            username = username.toLowerCase().trim();
            email = email.toLowerCase().trim();
            //  Init DB
            const { DbUser } = (0, list_database_1.DbList)();
            //  Validate request entry
            const { error } = auth_validator_1.default.register(req.body);
            if (error)
                return input_error_1.default.input(res, error);
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
                return input_error_1.default.withoutInput(res, {
                    message: 'Ce email est dèja utiliser.',
                    code: 'ErrorAuth_1',
                    path: 'email',
                });
            }
            //  Verify if Username exist in database
            if (UserUsername) {
                return input_error_1.default.withoutInput(res, {
                    message: "Ce nom d'utilisateur est dèja utiliser.",
                    code: 'ErrorAuth_2',
                    path: 'username',
                });
            }
            //Cryp password
            const salt = await bcrypt_1.default.genSalt(10);
            const hashPassword = await bcrypt_1.default.hash(password, salt);
            //  Generate Token
            const SECRET_KEY_TOKEN = process.env.SECRET_KEY_TOKEN;
            const __TOKEN__ = jsonwebtoken_1.default.sign({ email: email }, SECRET_KEY_TOKEN);
            let FILES = [];
            FILES = req.files;
            if (FILES.length != 0) {
                for (let i = 0; i < FILES.length; i++) {
                    const media = FILES[i];
                    logo = env_config_1.env.HOST_CLIENT_IMAGE + '/' + media.filename;
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
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async signIn(req, res) {
        try {
            // Init
            let { email, password } = req.body;
            // Trim & LowerCase
            email = email.toLowerCase().trim();
            //  Init DB
            const { DbUser } = (0, list_database_1.DbList)();
            //  Validate request entry
            const { error } = auth_validator_1.default.login(req.body);
            if (error)
                return input_error_1.default.input(res, error);
            //  get the user from the email
            const user = await DbUser.findOne({
                where: { email },
            });
            //  Verify if email exist in database
            if (!user) {
                return input_error_1.default.withoutInput(res, {
                    message: 'Email ou mot de passe incorrect...',
                    code: 'ErrorAuth_Login_1',
                    path: 'email',
                });
            }
            //Cryp password
            const verifyPassword = await bcrypt_1.default.compare(password, user?.password);
            //  Verify if email exist in database
            if (!verifyPassword) {
                return input_error_1.default.withoutInput(res, {
                    message: 'Email ou mot de passe incorrect...',
                    code: 'ErrorAuth_Login_1',
                    path: 'email',
                });
            }
            const GetUserUpdate = await DbUser.findOne({
                where: { id: user.id }
            });
            return res.status(201).send({ user: GetUserUpdate });
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
}
exports.default = new AuthController();
