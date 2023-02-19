import nodemailer from "nodemailer";
import config from "../config";
import Logger from "../lib/logger";

async function sendEmail(opt: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: config.nodemailer.user,
      pass: config.nodemailer.pass,
    },
    debug: true,
  });

  const mailOptions = {
    from: config.nodemailer.email,
    to: opt.email,
    subject: opt.subject,
    text: opt.body,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        Logger.error(error);
        reject(error);
      } else {
        Logger.info("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
}
function welcomeMail(email: string) {
  const opt = {
    email,
    subject: "WELCOME TO TWITEE",
    body: "You are welcome in the name of the lord",
  };
  sendEmail(opt);
}

export { welcomeMail };
