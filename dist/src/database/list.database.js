"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbList = void 0;
const index_database_1 = require("./index.database");
const user_1 = require("./../models/user");
const headers_1 = require("../models/headers");
const blogs_1 = require("../models/blogs");
const activites_1 = require("../models/activites");
const mediaSociaux_1 = require("../models/mediaSociaux");
const contacts_1 = require("../models/contacts");
const banners_1 = require("../models/banners");
const pasts_presidents_1 = require("../models/pasts_presidents");
const pasts_presidentMedia_1 = require("../models/pasts_presidentMedia");
const teams_1 = require("../models/teams");
const activites_media_1 = require("../models/activites.media");
const DbList = () => {
    //User
    function DbUser() {
        return index_database_1.dbx.getRepository(user_1.User);
    }
    //
    function DbActivites() {
        return index_database_1.dbx.getRepository(activites_1.Activites);
    }
    //
    function DbActiviteMedia() {
        return index_database_1.dbx.getRepository(activites_media_1.ActiviteMedia);
    }
    //
    function DbBlogs() {
        return index_database_1.dbx.getRepository(blogs_1.Blogs);
    }
    //
    function DbHeaders() {
        return index_database_1.dbx.getRepository(headers_1.Headers);
    }
    //
    function DbContacts() {
        return index_database_1.dbx.getRepository(contacts_1.Contacts);
    }
    //
    function DbMediaSociaux() {
        return index_database_1.dbx.getRepository(mediaSociaux_1.MediaSociaux);
    }
    //
    function DbBanners() {
        return index_database_1.dbx.getRepository(banners_1.Banners);
    }
    function DbPastPresidents() {
        return index_database_1.dbx.getRepository(pasts_presidents_1.PastsPresidents);
    }
    function DbPastPresidentMedia() {
        return index_database_1.dbx.getRepository(pasts_presidentMedia_1.PastsPresidentMedia);
    }
    function DbTeams() {
        return index_database_1.dbx.getRepository(teams_1.Teams);
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
exports.DbList = DbList;
