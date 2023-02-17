"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiry: process.env.JWT_LIFETIME,
    },
};
