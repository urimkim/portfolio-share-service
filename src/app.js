const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { awardRouter } = require("./routers/awardRouter");
const { certificateRouter } = require("./routers/certificateRouter");
const { projectRouter } = require("./routers/projectRouter");

const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const config = require("./config/index")

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(awardRouter);
app.use(certificateRouter);
app.use(projectRouter);
app.use(errorMiddleware);
app.use(cors());

// router
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// server
app.listen(config.port, () => {
  console.log(`${config.applicationName} Server on ${config.port}`);
});
