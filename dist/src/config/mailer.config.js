"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfiguration = void 0;
const nodemailer = __importStar(require("nodemailer"));
const env_config_1 = require("./env.config");
// Confiquration to connection
const transporter = nodemailer.createTransport({
    pool: env_config_1.env.MAIL_POOL,
    port: env_config_1.env.MAIL_PORT, // true for 465, false for other ports
    host: env_config_1.env.MAIL_HOST,
    auth: {
        user: env_config_1.env.MAIL_USERNAME,
        pass: env_config_1.env.MAIL_PASSWORD,
    },
    secure: false,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});
const mailConfiguration = (receivers, subject, template) => {
    const mailData = {
        from: 'noreply@likidons.com', // sender address
        to: receivers, // list of receivers
        subject: subject,
        html: template,
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
};
exports.mailConfiguration = mailConfiguration;
