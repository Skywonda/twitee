import { Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import postRouter from "./post.routes";

const rootRouter = Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/posts", postRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;
