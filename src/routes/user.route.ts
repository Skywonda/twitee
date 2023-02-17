import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

// const { verifyUser } = require("../middleware/authentication");

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getUsers);

export default userRouter;
