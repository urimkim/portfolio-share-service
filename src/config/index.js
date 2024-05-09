const dotenv = require("dotenv");
dotenv.config();

const jwt = process.env.JWT;
const port = process.env.PORT ?? 4040;

if (process.env.MONGODB_URL === null || process.env.MONGODB_URL === undefined) {
  throw new Error("MONGODB_URL 환경변수는 필수입니다");
}

module.exports = {
  applicationName: "포트폴리오 웹서비스 API",
  port: port,
  mongoDBURL: process.env.MONGODB_URL,
  jwt: jwt,
};
