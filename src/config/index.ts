export default {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiry: process.env.JWT_LIFETIME as string,
  },
  nodemailer: {
    user: process.env.NODEMAILER_USER,
    email: process.env.NODEMAILER_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
  },
};
