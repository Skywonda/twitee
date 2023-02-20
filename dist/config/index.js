"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiry: process.env.JWT_LIFETIME,
    },
    nodemailer: {
        user: process.env.NODEMAILER_USER,
        email: process.env.NODEMAILER_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        access_token: process.env.GOOGLE_ACCESS_TOKEN,
    },
};
