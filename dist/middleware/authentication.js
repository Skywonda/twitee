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
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const { findUserById } = require("../services/user.services");
const tokenExtractor = function (req) {
    let authorization = req.headers.authorization;
    if (authorization) {
        authorization = authorization.split(" ")[1];
        return authorization;
    }
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt_token"];
    }
    return token;
};
const opts = {};
opts.jwtFromRequest = tokenExtractor;
opts.secretOrKey = config.jwt.secret;
exports.jwtPassport = passport.use(new JwtStrategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield findUserById(payload.id);
    if (!user)
        return done(null, false);
    return done(null, user);
})));
exports.verifyUser = passport.authenticate("jwt", { session: false });
