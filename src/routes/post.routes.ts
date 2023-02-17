import { Router } from "express";
import postController from "../controllers/posts.controller";
import { verifyUser } from "../middleware/authentication";

const postRouter = Router();

const unprotectedRoute = Router();

postRouter.use(unprotectedRoute);
postRouter.use(verifyUser);

postRouter.route("/").post(postController.createPost);

postRouter.route("/like").post(postController.likePost);
postRouter.route("/dislike").post(postController.dislikePost);

postRouter.route("/comment").post(postController.addComment);
postRouter.route("/:id").delete(postController.deletePost);

unprotectedRoute.route("/all").get(postController.getAllPosts);
unprotectedRoute.route("/user/:id").get(postController.getUserPosts);
unprotectedRoute.route("/:id").get(postController.getSinglePost);

export default postRouter;
