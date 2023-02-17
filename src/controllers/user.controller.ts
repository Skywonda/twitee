import UserService from "../services/user.services";
import moment from "moment";
import { Request, Response } from "express";
import { PrismaQuery, UserSearchQuery } from "./entity/interfaces";
import { BadRequestError } from "../errors/errors";
import { welcomeMail } from "../utils/mails";

export default {
  async createUser(req: Request, res: Response) {
    const user = await UserService.createUser(req.body);
    welcomeMail(user.email);
    res.status(201).json({
      msg: "User created!",
      user,
    });
  },

  async getUsers(req: Request, res: Response) {
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

    const user = await UserService.findUsers(where);
    res.json({ user });
  },
};
