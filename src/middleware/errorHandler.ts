import { Request, Response, NextFunction } from "express";
import Logger from "../lib/logger";
export default async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.info(err);
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || err.msg || "An error occured!",
  };
  return res.status(customError.statusCode).json({ msg: customError.message });
};
