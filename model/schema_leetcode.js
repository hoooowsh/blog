const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeetcodeSchema = new Schema({
  problemNum: Number,
  title: String,
  date:{
    type: Date,
  },
  text: String
});

const Leetcode = mongoose.model('Leetcode', LeetcodeSchema);
module.exports = {
  Leetcode,
  LeetcodeSchema
}
