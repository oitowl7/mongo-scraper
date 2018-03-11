const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const exphbs = require('express-handlebars')
let router = express.Router();
// Initialize Express
var app = express();
// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoScraper", {
//   useMongoClient: true
});



router.get('/', function(req, res) {
    res.send('fetch route works');
    axios.get("https://www.nytimes.com/").then(response => {
        const $ = cheerio.load(response.data);
        // $("div.xx-small").each((i, element) => {
        //     $(element).remove();
        // })
        // $("div.x-small").each((i, element) => {
        //     $(element).remove();
        // })
        // $("div.line-outer").each((i, element) => {
        //     $(element).remove();
        // })
        $("h2.section-heading").each((i, element) => {
            $(element).parent().remove();
        })
        $("h1.story-heading").each((i, element) => {
            console.log("Title: " + $(element).text());
            console.log("Link: " + $(element).children().attr("href") + " \n");
        })

        $("h2.story-heading").each((i, element) => {
            let result = {};
            // console.log("Title: " + $(element).text().trim());
            // console.log("Link: " + $(element).children("a").attr("href") + " \n");
            if ($(element).text().trim() === "Search for Homes for Sale or Rent" || $(element).text().trim() === "Mortgage Calculator") {
            } else {
                result.title = $(element).text().trim();
                result.link = $(element).children("a").attr("href");
                result.summary = $(element).parent().children("p").attr("class", "summary").text().trim();
            }
            db.Headline.create(result)
            .then(data => {
                console.log(result)
                console.log(data);
            }).catch(err => {
                return;
            })
        })
    })
});

module.exports = router;
