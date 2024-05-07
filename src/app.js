const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { awardRouter } = require("./routers/awardRouter");
const { certificateRouter } = require("./routers/certificateRouter");
const { projectRouter } = require("./routers/projectRouter");

const cors = require("cors");
const router = require("./routers/router");
const config = require("./config/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(awardRouter);
app.use(certificateRouter);
app.use(projectRouter);

// middlewares
app.use(cors());
// router
app.use("/api/auth", router);

app.use(errorMiddleware);

/*
app.listen(3000, (req, res) => {
  console.log("Connected, 3000 port!");
});
*/

// server
app.listen(config.port, () => {
  console.log(`${config.applicationName} Server on ${config.port}`);
});
