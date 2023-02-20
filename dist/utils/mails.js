"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../lib/logger"));
function sendEmail(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                type: "OAUTH2",
                user: config_1.default.nodemailer.user,
                clientId: config_1.default.nodemailer.client_id,
                clientSecret: config_1.default.nodemailer.client_secret,
                accessToken: config_1.default.nodemailer.access_token,
                refreshToken: config_1.default.nodemailer.refresh_token,
            },
            debug: true,
        });
        const mailOptions = {
            from: config_1.default.nodemailer.email,
            to: opt.email,
            subject: opt.subject,
            text: opt.body,
        };
        yield new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    logger_1.default.error(error);
                    reject(error);
                }
                else {
                    logger_1.default.info("Email sent: " + info.response);
                    resolve(info);
                }
            });
        });
    });
}
function welcomeMail(email) {
    const opt = {
        email,
        subject: "WELCOME TO TWITEE",
        body: "You are welcome in the name of the lord",
    };
    sendEmail(opt);
}
exports.welcomeMail = welcomeMail;
