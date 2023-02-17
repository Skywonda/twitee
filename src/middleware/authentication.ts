import { NextFunction, Request, Response } from "express";

import config from "../config";
import PassportJwt from "passport-jwt";

const JwtStrategy = PassportJwt.Strategy;

const passport = require("passport");

import UserService from "../services/user.services";

const tokenExtractor = function (req: Request) {
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

const opts = {} as any;
opts.jwtFromRequest = tokenExtractor;
opts.secretOrKey = config.jwt.secret;

passport.use(
  new JwtStrategy(opts, async (payload: any, done: any) => {
    const user = await UserService.findUserById(payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  })
);

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
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
