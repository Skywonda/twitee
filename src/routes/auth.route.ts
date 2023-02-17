import { Router } from "express";

import authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);

authRouter.delete("/log-out", authController.logout);

export default authRouter;
