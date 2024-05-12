"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbx = void 0;
const env_config_1 = require("../config/env.config");
const parametreNotification_1 = require("../models/parametreNotification");
const parametrePreference_1 = require("../models/parametrePreference");
const user_1 = require("../models/user");
const userRole_1 = require("../models/userRole");
const typeorm_1 = require("typeorm");
const activites_1 = require("../models/activites");
const blogs_1 = require("../models/blogs");
const headers_1 = require("../models/headers");
const mediaSociaux_1 = require("../models/mediaSociaux");
const contacts_1 = require("../models/contacts");
const banners_1 = require("../models/banners");
const pasts_presidents_1 = require("../models/pasts_presidents");
const teams_1 = require("../models/teams");
const activites_media_1 = require("../models/activites.media");
exports.dbx = new typeorm_1.DataSource({
    type: 'mysql',
    host: env_config_1.env.DB_HOST,
    port: env_config_1.env.DB_PORT,
    username: env_config_1.env.DB_USERNAME,
    password: env_config_1.env.DB_PASSWORD,
    database: env_config_1.env.DB_DATABASE,
    charset: env_config_1.env.DB_CHARSET,
    synchronize: true,
    logging: false,
    entities: [
        user_1.User,
        userRole_1.UserRole,
        parametreNotification_1.ParametreNotification,
        parametrePreference_1.ParametrePreference,
        activites_1.Activites,
        activites_media_1.ActiviteMedia,
        blogs_1.Blogs,
        mediaSociaux_1.MediaSociaux,
        headers_1.Headers,
        contacts_1.Contacts,
        banners_1.Banners,
        pasts_presidents_1.PastsPresidents,
        teams_1.Teams
    ],
    subscribers: [],
    migrations: [],
});
