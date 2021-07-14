const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
// const { v4: uuid } = require("uuid");
const app = express();
const mongoose = require("mongoose");
const Tweets = require("./tweets.js");
const Tweet = require("./tweets.js");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const queryString = require("query-string");
var MongoClient = require("mongodb").MongoClient;
const axios = require("axios");
const anime = require("animejs");

mongoose.connect("mongodb://localhost:27017/otaku", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongoURI = "mongodb://localhost:27017/otaku";

const conn = mongoose.createConnection(mongoURI);
var gfs;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);

  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "uploads",
      };
    } else {
      return null;
    }
  },
});
const upload = multer({ storage });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  gfs.files.find().toArray(async (e, files) => {
    const tweets = await Tweets.find({});

    imgs = files;
    // console.log(imgs);
    // console.log(tweets);

    res.render("index", { tweets, imgs });
  });
});

app.get("/socials", async (req, res) => {
  gfs.files.find().toArray(async (e, files) => {
    const tweets = await Tweets.find({});

    imgs = files;
    // console.log(imgs);
    // console.log(tweets);

    res.render("socials", { tweets, imgs });
  });
});

app.get("/imgsApi/:fileName", async (req, res) => {
  gfs.files.findOne({ filename: req.params.fileName }, async (e, files) => {
    // const imgs = files;
    // console.log(files);
    var readstream = gfs.createReadStream(files.filename);
    readstream.pipe(res);
  });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/", upload.single("file"), async (req, res) => {
  const { name, tweet } = req.body;
  const newTweet = new Tweet({ name, tweet, date: Date() });
  await newTweet.save();
  //   const { date } = Date();
  // tweets.push({ name, tweet, date: Date() });

  res.redirect("/socials");
});

app.get("/search", async (req, res) => {
  const { name } = req.query;

  const options = {
    method: "GET",
    url: "https://jikan1.p.rapidapi.com/search/anime",
    params: { q: name },
    headers: {
      "x-rapidapi-key": "2902e79e2fmshfe1d6430d124b98p183fc1jsn0fe5315898c6",
      "x-rapidapi-host": "jikan1.p.rapidapi.com",
    },
  };

  axios.request(options).then(function (response) {
    data = response.data.results[1];
    console.log(data);
    res.render("search", { data });
  });

  //   res.render("index", { name });
});

app.listen(3000, () => console.log("on port 3000!!"));
