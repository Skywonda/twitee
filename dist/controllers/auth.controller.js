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
const errors_1 = require("../errors/errors");
const user_services_1 = __importDefault(require("../services/user.services"));
const { compareHash, createToken } = require("../utils/helper");
exports.default = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_services_1.default.findUserByEmail(email);
            if (!email)
                throw new errors_1.AuthenticationError("Invalid credentials!");
            const validPassword = yield compareHash(password, user.password);
            if (!validPassword)
                throw new errors_1.AuthenticationError("Invalid credentials!");
            const token = createToken({
                id: user.id,
                email: user.email,
                name: user.name,
            });
            res.cookie("jwt_token", token).json({ msg: "login successful!", token });
        });
    },
};
