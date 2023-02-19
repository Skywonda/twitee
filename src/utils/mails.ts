import nodemailer from "nodemailer";
import config from "../config";

function sendEmail(opt: any) {
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

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
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
