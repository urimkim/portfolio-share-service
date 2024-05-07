const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const app = express();
const config = require("./config/index");

// server
app.listen(config.port, () => {
  console.log(`${config.applicationName} Server on ${config.port}`);
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// mongodb
mongoose
  .connect(config.mongoDBURI)
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(() => {
    console.log("DB 연결 실패");
  });
