const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  title: String,
  date:{
    type: Date,
  },
  text: String
});

const Journal = mongoose.model('Journal', JournalSchema);
module.exports = {
  Journal,
  JournalSchema
}
