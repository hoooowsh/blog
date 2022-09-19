const mongoose = require('moongoose');
const Schema = mongoose.Schema;

const LeetcodeSchema = new Schema({
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
