"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiry: process.env.JWT_LIFETIME,
    },
    nodemailer: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
        email: process.env.NODEMAILER_EMAIL,
    },
};
