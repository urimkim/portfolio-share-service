const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');
const awardRouter = require('./routers/awardRouter');
const certificateRouter = require('./routers/certificateRouter');
const projectRouter = require('./routers/projectRouter');
const educationRouter = require('./routers/educationRouter');
const config = require('./config');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/my-info/awards', awardRouter);
app.use('/api/my-info/certificates', certificateRouter);
app.use('/api/my-info/projects', projectRouter);
app.use('/api/my-info/educations', educationRouter);

app.use(errorMiddleware);

// server
app.listen(config.port, () => {
  console.log(`${config.applicationName} Server on ${config.port}`);
});
