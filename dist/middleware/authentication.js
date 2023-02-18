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
exports.verifyUser = void 0;
const config_1 = __importDefault(require("../config"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const JwtStrategy = passport_jwt_1.default.Strategy;
const passport = require("passport");
const user_services_1 = __importDefault(require("../services/user.services"));
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
opts.secretOrKey = config_1.default.jwt.secret;
passport.use(new JwtStrategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.default.findUserById(payload.id);
    if (!user)
        return done(null, false);
    return done(null, user);
})));
function verifyUser(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    })(req, res, next);
}
exports.verifyUser = verifyUser;
