"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugGetter = void 0;
const slugify_1 = __importDefault(require("slugify"));
const slugGetter = async (res, value, Model) => {
    let slugExist;
    let slug;
    do {
        // Defined the letter associated
        const letter = 'd j o u m a f'.split(' ');
        const letterRamdom = Math.floor(Math.random() * letter.length);
        // Defined the slug of profile
        slug = `${(0, slugify_1.default)(value, '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();
        if (slugExist)
            return { jSlug: null };
    } while (slugExist);
    //
    return { jSlug: slug };
};
exports.slugGetter = slugGetter;
