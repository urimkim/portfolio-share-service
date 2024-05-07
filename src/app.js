const express = require('express');
const { educationRouter } = require('./routers/educationRouter');
const { authenticateUser } = require('./middlewares/authenticateUser')
const { Education } = require('./db/index'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/my-info/educations', authenticateUser, educationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행되었습니다.`);
});
