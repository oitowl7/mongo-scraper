var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  title: {
    type: String,
    unique: "This thingy is already in here",
    required: true
  },
  redditLink: {
    type: String,
    required: true
  },
  externalLink: {
      type: String,
  },
  subReddit: {
      type: String
  },
  saved: {
      type: Boolean,
      required: true,
      default: false
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});
var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;
