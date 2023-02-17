import { Request, Response, NextFunction } from "express";
export default async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || err.msg || "An error occured!",
  };
  return res.status(customError.statusCode).json({ msg: customError.message });
};
