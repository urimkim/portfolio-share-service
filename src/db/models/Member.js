const mongoose = require('mongoose');
const userSchema = require('../schemas/user');

const Member = mongoose.model('Member', userSchema);

module.exports = Member;
