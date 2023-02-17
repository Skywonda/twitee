export default {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiry: process.env.JWT_LIFETIME as string,
  },
  nodemailer: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
    email: process.env.NODEMAILER_EMAIL,
  },
};
