const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  jwtSecret: process.env.JWT_SECRET,
  email : process.env.EMAIL,
  passwordMail : process.env.PASSWORD_EMAIL,
  paypalApi : process.env.PAYPAL_API,
  paypalClientId : process.env.PAYPAL_CLIENT_ID,
  paypalSecret : process.env.PAYPAL_SECRET,
};