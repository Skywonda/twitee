"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
function sendEmail(opt) {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_1.default.nodemailer.user,
            pass: config_1.default.nodemailer.pass,
        },
    });
    const mailOptions = {
        from: config_1.default.nodemailer.email,
        to: opt.email,
        subject: opt.subject,
        text: opt.body,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
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
