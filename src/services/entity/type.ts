import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class CreatePostDto {
  @IsString()
  content!: string;

  @IsString()
  ownerId!: string;
}

export class LikePostDto {
  @IsString()
  postId!: string;

  @IsString()
  userId!: string;
}

export class AddComment {
  @IsString()
  postId!: string;

  @IsString()
  authorId!: string;

  @IsString()
  content!: string;
}
