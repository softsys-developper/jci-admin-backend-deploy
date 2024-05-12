"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationServices {
    async Content(type, content) {
        if (type == 1) {
            //
            return content
                ? `A commencé à likider : ${content}`
                : `A commencé à likider.`;
        }
        else if (type == 2) {
            return `Vous suit désormais.`;
        }
        else if (type == 3) {
            return content
                ? `A trouvé votre likidation intéressante : ${content}`
                : `A trouvé votre likidation intéressante.`;
        }
        else if (type == 4) {
            return content ? `A commenté votre likidation : ${content}`
                : `A commenté votre likidation.`;
        }
        else if (type == 5) {
            return `A arrêté de vous suivre.`;
        }
    }
}
exports.default = new NotificationServices();
