const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { awardRouter } = require("./routers/awardRouter");
const { certificateRouter } = require("./routers/certificateRouter");
const { projectRouter } = require("./routers/projectRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(awardRouter);
app.use(certificateRouter);
app.use(projectRouter);

app.use(errorMiddleware);

app.listen(3000, (req, res) => {
  console.log("Connected, 3000 port!");
});
