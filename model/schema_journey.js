const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JourneySchema = new Schema({
  title: String,
  date:{
    type: Date,
  },
  text: String
});

const Journey = mongoose.model('Journey', JourneySchema);
module.exports = {
  Journey,
  JourneySchema
}
