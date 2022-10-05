const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  parent_post_id:{
    type: String,
    required: true
  },
  poster_name: String,
  text: String,
  date: Date
})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {
  Comment,
  CommentSchema
}
