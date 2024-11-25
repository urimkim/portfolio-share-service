const mongoose = require('mongoose');
const Award = require('../db/models/Award');
const Certificate = require('../db/models/Certificate');
const Project = require('../db/models/Project');
const Education = require('../db/models/Education');
require('dotenv').config();

const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () =>
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ')
);
db.on('error', (error) =>
  console.error('MongoDB 연결에 실패하였습니다...\n' + '\n' + error)
);

module.exports = {
  Award,
  Certificate,
  Project,
  Education
};
