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
const user_services_1 = __importDefault(require("../services/user.services"));
const moment_1 = __importDefault(require("moment"));
const errors_1 = require("../errors/errors");
exports.default = {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.default.createUser(req.body);
            res.status(201).json({
                msg: "User created!",
                user,
            });
        });
    },
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, time_format, start, end } = req.query;
            const where = {};
            if (time_format) {
                if (!["hour", "day", "month"].includes(time_format))
                    throw new errors_1.BadRequestError("Invalid time format!");
                if (!start && !end)
                    throw new errors_1.BadRequestError("Start and end value is required!");
                if (end && !start)
                    throw new errors_1.BadRequestError("Start value is required!");
                if (end > start)
                    throw new errors_1.BadRequestError("lol man, the start should be greater!");
                const startDate = (0, moment_1.default)().subtract(start, time_format).toDate();
                const endDate = (0, moment_1.default)().subtract(end).toDate();
                where.created_at = {
                    gte: startDate,
                    lte: endDate,
                };
            }
            if (name)
                where.name = {
                    contains: name,
                    mode: "insensitive",
                };
            const user = yield user_services_1.default.findUsers(where);
            res.json({ user });
        });
    },
};
