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
const client_1 = require("@prisma/client");
const errors_1 = require("../errors/errors");
const helper_1 = require("../utils/helper");
const prisma = new client_1.PrismaClient();
class UserService {
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.findUserByEmail(data.email);
            if (userExist)
                throw new errors_1.ConflictError("This user already exist!");
            data.password = yield (0, helper_1.hashPassword)(data.password);
            const user = yield prisma.user.create({ data });
            return user;
        });
    }
    static findUsers(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                },
            });
            return user;
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { id } });
            if (!user)
                throw new errors_1.NotFoundError("User not found!");
            return user;
        });
    }
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
                rejectOnNotFound: false,
            });
            return user;
        });
    }
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.update({ where: { id }, data });
            return user;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.delete({ where: { id } });
            return user;
        });
    }
}
exports.default = UserService;
