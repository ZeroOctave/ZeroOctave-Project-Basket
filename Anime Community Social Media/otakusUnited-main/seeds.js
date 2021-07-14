const mongoose = require("mongoose");
const tweet = require("./tweets.js");

mongoose.connect("mongodb://localhost:27017/tweets2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

tweet.insertMany([
  {
    name: "Vishal",
    tweet: "The trailer for chainsaw man just dropped guys!!!",
    date: Date(),
  },
  {
    name: "Ritush",
    tweet: "Here's your daily dose bro",
    date: Date(),
  },
  {
    name: "Ravindra",
    tweet: "Plz delete your account, Ritush",
    date: Date(),
  },
  {
    name: "Amitesh",
    tweet: "yo",
    date: Date(),
  },
]);
