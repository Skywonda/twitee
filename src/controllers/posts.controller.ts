import moment from "moment";
import { Request, Response } from "express";
import { PrismaQuery, UserSearchQuery } from "./entity/interfaces";
import {
  AuthorizationError,
  BadRequestError,
  NotFoundError,
} from "../errors/errors";
import PostService from "../services/posts.services";
import UserService from "../services/user.services";
import { Prisma } from "@prisma/client";
import { AddComment } from "../services/entity/type";

export default {
  async createPost(req: Request & { user?: { id?: string } }, res: Response) {
    const data: any = {};

    data.content = req.body.content;
    data.ownerId = req?.user?.id;

    const post = await PostService.createPost(data);

    res.status(201).json({
      msg: "Post created!",
      post,
    });
  },

  async getAllPosts(req: Request, res: Response) {
    const { name, time_format, start, end }: UserSearchQuery = req.query as any;
    const where: PrismaQuery = {};

    if (time_format) {
      if (!["hour", "day", "month"].includes(time_format))
        throw new BadRequestError("Invalid time format!");

      if (!start && !end)
        throw new BadRequestError("Start and end value is required!");

      if (end && !start) throw new BadRequestError("Start value is required!");

      if (end > start)
        throw new BadRequestError("lol man, the start should be greater!");

      const startDate = moment().subtract(start, time_format).toDate();
      const endDate = moment().subtract(end).toDate();
      where.created_at = {
        gte: startDate,
        lte: endDate,
      } as any;
    }
    if (name)
      where.name = {
        contains: name,
        mode: "insensitive",
      } as any;
    const post = await PostService.getAllPost(where);
    res.json({ post });
  },

  async getUserPosts(req: Request, res: Response) {
    const userId: any = req.params.id;
    if (!userId) throw new BadRequestError("user id is required!");
    const userExist = await UserService.findUserById(userId);
    if (!userExist)
      throw new BadRequestError("User with this id does not exist!");
    const where: any = {};

    where.ownerId = userId;
    const post = await PostService.getAllPost(where);

    res.json({ post });
  },

  async getSinglePost(req: Request, res: Response) {
    const postId: any = req.params.id;

    const post = await PostService.getSinglePost({ id: postId });
    if (!post) throw new NotFoundError("Post not found");
    res.json(post);
  },

  async deletePost(req: Request & { user?: { id?: string } }, res: Response) {
    const userId = req.user?.id;
    const postId: any = req.params.id;
    const post = await PostService.getSinglePost(userId);

    if (!post) throw new NotFoundError("Post not found!");

    if (post.ownerId !== userId)
      throw new AuthorizationError(
        "You are not authorized to delete this post!"
      );

    const update = await PostService.deletePost(postId);
    res.json({ update });
  },

  async likePost(req: Request & { user?: { id?: string } }, res: Response) {
    const data: any = {};
    data.userId = req?.user?.id;
    data.postId = req.body.postId;

    await PostService.likePost(data);

    res.json({ msg: "Post has been liked!" });
  },

  async dislikePost(req: Request & { user?: { id?: string } }, res: Response) {
    const data: any = {};
    data.userId = req?.user?.id;
    data.postId = req.body.postId;

    await PostService.dislikePost(data);

    res.json({ msg: "Post has been disliked!" });
  },

  async addComment(req: Request & { user?: { id?: string } }, res: Response) {
    const { content, postId } = req.body;
    const data: any = {};
    data.authorId = req?.user?.id;
    data.postId = postId;
    data.content = content;

    const commnet = await PostService.addComment(data);
    res.json({ msg: "Comment added", commnet });
  },
};
