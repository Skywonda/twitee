import { Request, Response } from "express";
import { AuthenticationError } from "../errors/errors";

import UserService from "../services/user.services";
const { compareHash, createToken } = require("../utils/helper");

export default {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user: any = await UserService.findUserByEmail(email);
    if (!user) throw new AuthenticationError("Invalid credentials!");

    const validPassword = await compareHash(password, user.password);
    if (!validPassword) throw new AuthenticationError("Invalid credentials!");

    const token = createToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    res.cookie("jwt_token", token).json({ msg: "login successful!", token });
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("jwt_token");
    res.json({ msg: "Logout succesful!" });
  },
};
