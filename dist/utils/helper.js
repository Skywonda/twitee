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
exports.createToken = exports.compareHash = exports.hashPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/index"));
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(argon2_1.default.hash(password));
        return yield argon2_1.default.hash(password);
    });
}
exports.hashPassword = hashPassword;
function compareHash(plain, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield argon2_1.default.verify(hash, plain);
    });
}
exports.compareHash = compareHash;
const createToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, index_1.default.jwt.secret, {
        expiresIn: index_1.default.jwt.expiry,
        algorithm: "HS256",
    });
    return token;
};
exports.createToken = createToken;
