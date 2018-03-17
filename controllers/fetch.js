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
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));




router.get('/', function(req, res) {
    console.log("we're fetching")
    axios.get("https://www.reddit.com").then(response => {
        const $ = cheerio.load(response.data);
        $("a.title").each((i, element) => {
            const title = $(element).text().trim();
            const redditLink = "www.reddit.com/" + $(element).parent().parent().parent().parent().attr("data-permalink")
            const externalLink = $(element).parent().parent().parent().parent().attr("data-url")
            const subReddit = $(element).parent().parent().parent().parent().attr("data-subreddit")
            let result = {
                title,
                redditLink,
                externalLink,
                subReddit
            }
            db.Headline.create(result)
            .then(data => {
                console.log(result);
                console.log(data);
                res.send("it worked");
            })
        })
    })
});

module.exports = router;
