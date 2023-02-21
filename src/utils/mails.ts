import nodemailer from "nodemailer";
import config from "../config";
import { BadRequestError } from "../errors/errors";
import Logger from "../lib/logger";

async function sendEmail(opt: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      type: "OAUTH2",
      user: config.nodemailer.user,
      clientId: config.nodemailer.client_id,
      clientSecret: config.nodemailer.client_secret,
      accessToken: config.nodemailer.access_token,
      refreshToken: config.nodemailer.refresh_token,
    },
    debug: true,
  });

  const mailOptions = {
    from: config.nodemailer.email,
    to: opt.email,
    subject: opt.subject,
    text: opt.body,
  };

  const sendMail = await transporter.sendMail(mailOptions);
  if (!sendEmail) throw new BadRequestError("Something went wrong!");
  console.log(sendMail);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      Logger.error(error);
    } else {
      Logger.info("Email sent: " + info.response);
    }
  });
}

async function welcomeMail(email: string) {
  const opt = {
    email,
    subject: "WELCOME TO TWITEE",
    body: "You are welcome in the name of the lord",
  };
  await sendEmail(opt);
}

export { welcomeMail };
