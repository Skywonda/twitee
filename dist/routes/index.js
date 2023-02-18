"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const post_routes_1 = __importDefault(require("./post.routes"));
const rootRouter = (0, express_1.Router)();
rootRouter.use("/users", user_route_1.default);
rootRouter.use("/posts", post_routes_1.default);
rootRouter.use("/auth", auth_route_1.default);
exports.default = rootRouter;
