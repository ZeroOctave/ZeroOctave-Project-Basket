const mongoose = require("mongoose");

const tweetsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tweet: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Tweet = mongoose.model("Tweet", tweetsSchema);

module.exports = Tweet;
