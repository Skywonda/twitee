import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../config/index";

async function hashPassword(password: string) {
  console.log(argon2.hash(password));
  return await argon2.hash(password);
}

async function compareHash(plain: string, hash: string) {
  return await argon2.verify(hash, plain);
}

const createToken = (payload: string) => {
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
    algorithm: "HS256",
  });
  return token;
};

export { hashPassword, compareHash, createToken };
