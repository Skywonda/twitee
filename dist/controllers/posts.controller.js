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
const moment_1 = __importDefault(require("moment"));
const errors_1 = require("../errors/errors");
const posts_services_1 = __importDefault(require("../services/posts.services"));
const user_services_1 = __importDefault(require("../services/user.services"));
exports.default = {
    createPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.content = req.body.content;
            data.ownerId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            const post = yield posts_services_1.default.createPost(data);
            res.status(201).json({
                msg: "Post created!",
                post,
            });
        });
    },
    getAllPosts(req, res) {
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
            const post = yield posts_services_1.default.getAllPost(where);
            res.json({ post });
        });
    },
    getUserPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (!userId)
                throw new errors_1.BadRequestError("user id is required!");
            const userExist = yield user_services_1.default.findUserById(userId);
            if (!userExist)
                throw new errors_1.BadRequestError("User with this id does not exist!");
            const where = {};
            where.ownerId = userId;
            const post = yield posts_services_1.default.getAllPost(where);
            res.json({ post });
        });
    },
    getSinglePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.id;
            const post = yield posts_services_1.default.getSinglePost({ id: postId });
            if (!post)
                throw new errors_1.NotFoundError("Post not found");
            res.json(post);
        });
    },
    deletePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const postId = req.params.id;
            const post = yield posts_services_1.default.getSinglePost(userId);
            if (!post)
                throw new errors_1.NotFoundError("Post not found!");
            if (post.ownerId !== userId)
                throw new errors_1.AuthorizationError("You are not authorized to delete this post!");
            const update = yield posts_services_1.default.deletePost(postId);
            res.json({ update });
        });
    },
    likePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            data.postId = req.body.postId;
            yield posts_services_1.default.likePost(data);
            res.json({ msg: "Post has been liked!" });
        });
    },
    dislikePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            data.postId = req.body.postId;
            yield posts_services_1.default.dislikePost(data);
            res.json({ msg: "Post has been disliked!" });
        });
    },
    addComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { content, postId } = req.body;
            const data = {};
            data.authorId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            data.postId = postId;
            data.content = content;
            const commnet = yield posts_services_1.default.addComment(data);
            res.json({ msg: "Comment added", commnet });
        });
    },
};
