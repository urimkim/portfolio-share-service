const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const awardRouter = require("./routers/awardRouter");
const certificateRouter = require("./routers/certificateRouter");
const projectRouter = require("./routers/projectRouter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const config = require("./config/index")

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authenticationMiddleware);

// router
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/my-info", awardRouter);
app.use("/api/my-info", certificateRouter);
app.use("/api/my-info", projectRouter);

app.use(errorMiddleware);

// server
app.listen(config.port, () => {
  console.log(`${config.applicationName} Server on ${config.port}`);
});
