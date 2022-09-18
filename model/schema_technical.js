const mongoose = require('moongoose');
const Schema = mongoose.Schema;

const TechnicalSchema = new Schema({
  title: String,
  date:{
    type: Date,
  },
  text: String
});

const Technical = mongoose.model('Technical', TechnicalSchema);
module.exports = {
  Technical,
  TechnicalSchema
}
