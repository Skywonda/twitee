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
const client_1 = require("@prisma/client");
const errors_1 = require("../errors/errors");
const user_services_1 = __importDefault(require("./user.services"));
const prisma = new client_1.PrismaClient();
class PostService {
    static createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield user_services_1.default.findUserById(data.ownerId);
            if (!userExist)
                throw new errors_1.BadRequestError("User with this id does not exist!");
            const post = yield prisma.post.create({ data });
            return post;
        });
    }
    static getAllPost(where = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield prisma.post.findMany({
                where,
                include: { owner: { select: { name: true } } },
            });
            return post;
        });
    }
    static getSinglePost(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield prisma.post.findUnique({
                where,
                include: { owner: true, comment: true, like: true },
            });
            return post;
        });
    }
    static updatePost(where, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield prisma.post.update({ where, data });
                return post;
            }
            catch (err) {
                throw new errors_1.BadRequestError(err);
            }
        });
    }
    static deletePost(where) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.post.delete({ where });
                return true;
            }
            catch (err) {
                throw new errors_1.BadRequestError(err);
            }
        });
    }
    static likePost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.getSinglePost({ id: data.postId });
            if (!post)
                throw new errors_1.NotFoundError("Post not found!");
            const likeExist = yield prisma.like.findFirst({
                where: { postId: data.postId, userId: data.userId },
            });
            if (likeExist)
                throw new errors_1.BadRequestError("you have liked this post already!");
            const like = yield prisma.like.create({ data });
            return like;
        });
    }
    static dislikePost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.getSinglePost({ id: data.postId });
            if (!post)
                throw new errors_1.NotFoundError("Post not found!");
            const likeExist = yield prisma.like.findFirst({
                where: { postId: data.postId, userId: data.userId },
            });
            if (!likeExist)
                throw new errors_1.BadRequestError("you didn't like this post!");
            const like = yield prisma.like.delete({ where: { id: likeExist.id } });
            return like;
        });
    }
    static addComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.getSinglePost({ id: data.postId });
            if (!post)
                throw new errors_1.NotFoundError("Post not found!");
            const comment = yield prisma.comment.create({ data });
            return comment;
        });
    }
}
exports.default = PostService;
