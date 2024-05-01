const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT ?? 4040;

if (process.env.MONGODB_URI === null || process.env.MONGODB_URI === undefined) {
  throw new Error("MONGODB_URI 환경변수는 필수입니다");
}

module.exports = {
  applicationName: "회원가입 API",
  port: port,
  mongoDBURI: process.env.MONGODB_URI,
};
