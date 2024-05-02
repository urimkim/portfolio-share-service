const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { educationRouter } = require("./routers/educationRouter");
const { projectRouter } = require("./routers/projectRouter");

const app = express();

app.use(educationRouter);
app.use(projectRouter);
app.use(errorMiddleware);

app.listen(3000,(req,res)=>{
    console.log('Connected, 3000 port!')
});
