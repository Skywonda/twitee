import { PrismaClient, Prisma } from "@prisma/client";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../errors/errors";
import { AddComment, CreatePostDto, LikePostDto } from "./entity/type";
import UserService from "./user.services";

const prisma = new PrismaClient();

class PostService {
  static async createPost(data: CreatePostDto) {
    const userExist = await UserService.findUserById(data.ownerId);
    if (!userExist)
      throw new BadRequestError("User with this id does not exist!");
    const post = await prisma.post.create({ data });
    return post;
  }

  static async getAllPost(where: any = {}) {
    const post = await prisma.post.findMany({
      where,
      include: { owner: { select: { name: true } } },
    });
    return post;
  }

  static async getSinglePost(where: any) {
    const post = await prisma.post.findUnique({
      where,
      include: { owner: true, comment: true, like: true },
    });
    return post;
  }

  static async updatePost(
    where: Prisma.PostWhereUniqueInput,
    data: Prisma.PostCreateInput
  ) {
    try {
      const post = await prisma.post.update({ where, data });
      return post;
    } catch (err: any) {
      throw new BadRequestError(err);
    }
  }

  static async deletePost(where: any) {
    try {
      await prisma.post.delete({ where });
      return true;
    } catch (err: any) {
      throw new BadRequestError(err);
    }
  }

  static async likePost(data: LikePostDto) {
    const post = await this.getSinglePost({ id: data.postId });
    if (!post) throw new NotFoundError("Post not found!");
    const likeExist = await prisma.like.findFirst({
      where: { postId: data.postId, userId: data.userId },
    });

    if (likeExist)
      throw new BadRequestError("you have liked this post already!");

    const like = await prisma.like.create({ data });

    return like;
  }

  static async dislikePost(data: LikePostDto) {
    const post = await this.getSinglePost({ id: data.postId });
    if (!post) throw new NotFoundError("Post not found!");

    const likeExist = await prisma.like.findFirst({
      where: { postId: data.postId, userId: data.userId },
    });

    if (!likeExist) throw new BadRequestError("you didn't like this post!");

    const like = await prisma.like.delete({ where: { id: likeExist.id } });
    return like;
  }

  static async addComment(data: AddComment) {
    const post = await this.getSinglePost({ id: data.postId });
    if (!post) throw new NotFoundError("Post not found!");

    const comment = await prisma.comment.create({ data });
    return comment;
  }
}

export default PostService;
