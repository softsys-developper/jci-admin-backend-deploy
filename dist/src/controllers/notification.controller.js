"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_error_1 = __importDefault(require("../utils/err/server.error"));
const notification_services_1 = __importDefault(require("../services/notification.services"));
const user_services_1 = __importDefault(require("../services/user.services"));
const chat_notification_1 = require("./notifications/chat.notification");
const list_database_1 = require("./../database/list.database");
class NotificationController extends chat_notification_1.ChatNotification {
    constructor() {
        super();
    }
    async index(req, res) {
        try {
            //
            const { type } = req.body;
            //
            const { Auth } = await user_services_1.default.current(req, res);
            const USER_NOTIFICATION = (0, list_database_1.DbList)().DbUserNotification;
            const GetNotification = await USER_NOTIFICATION.find({
                where: [
                    {
                        user: {
                            following: { userId: Auth.user?.id },
                        },
                        typeId: type,
                    },
                    {
                        user: {
                            follower: { followerId: Auth.user?.id },
                        },
                        typeId: 2,
                    },
                ],
                order: { createdAt: 'DESC' },
                relations: {
                    user: { profile: { media: true }, following: true },
                    userflw: { profile: { media: true } },
                    post: { medias: true },
                },
            });
            let GetAll = [...GetNotification];
            let GetAllFollow = GetNotification?.filter((el) => el.typeId == 2);
            // if(GetAllFollow.length != 0){
            //    GetAllFollow.forEach((flw) => {
            //       const flwDate = moment(flw.createdAt);
            //       GetNotification.forEach((nty) => {
            //          const ntyDate = moment(nty.createdAt);
            //          if (flwDate.diff(ntyDate) <= 0) {
            //             GetAll.push(nty);
            //          }
            //       });
            //    });
            // }else{
            //    GetAll.push(...GetNotification);
            // }
            GetAll = GetAll.filter((el) => el.typeId == type || type == undefined);
            //   if(type == undefined || type == 2 ){
            //    GetAll = GetAll.concat(GetAllFollow)
            //   }
            GetAll = GetAll.reverse().filter((objet, index, self) => index === self.findIndex((t) => t['typeId'] == objet['typeId'] && t['userId'] == objet['userId'] && t['redirect'] == objet['redirect']));
            const TIME = (m) => {
                const createdAt = new Date(m).getTime();
                return createdAt;
            };
            GetAll.sort((a, b) => {
                return TIME(b?.createdAt) - TIME(a?.createdAt);
            });
            // Get Count Notifications
            const countByNotification = USER_NOTIFICATION.count({
                where: {
                    user: {
                        following: {
                            userId: Auth.user?.id,
                        },
                    },
                    typeId: type,
                    Acknowledgment_all: false,
                },
            });
            if (!GetNotification) {
                return server_error_1.default.notInsertToDatabase(res);
            }
            // console.log('AllNotification:', AllNotification, 'AllUserFollow:', AllUserFollow)
            return res.status(201).send({
                notifications: GetAll,
                countByNotification: GetAll.length,
            });
        }
        catch (error) {
            console.log(error);
            server_error_1.default.catchError(res, req);
        }
    }
    async show(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, req);
        }
    }
    async create(req, res, data) {
        const { content, redirect, userId, typeId, postId } = data;
        const { Auth } = await user_services_1.default.current(req, res);
        // Init
        const USER_NOTIFICATION = (0, list_database_1.DbList)().DbUserNotification;
        const ContentNotif = await notification_services_1.default.Content(typeId, content);
        // Verify is notification is already send
        let newNotification;
        const isNoficated = await USER_NOTIFICATION.findOne({
            where: { userId, redirect, typeId: 2 },
        });
        let saveNotification;
        // if (isNoficated) {
        //    saveNotification = await USER_NOTIFICATION.softDelete({
        //       id: isNoficated?.id,
        //    });
        // } else {
        newNotification = USER_NOTIFICATION.create({
            content: ContentNotif,
            redirect,
            userId,
            typeId,
            postId: postId ? postId : null,
            userflwId: Auth.user?.id,
        });
        saveNotification = await USER_NOTIFICATION.save(newNotification);
        // }
        return { saveNotification };
    }
    async update(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
    async delete(req, res) {
        try {
        }
        catch (error) {
            server_error_1.default.catchError(res, error);
        }
    }
}
exports.default = new NotificationController();
