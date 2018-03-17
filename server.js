const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();
// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
const router = express.Router();

// handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
const databaseUri = 'mongodb://localhost/mongoScraper';
if (process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseUri);
}

const dbi = mongoose.connection;

dbi.on('error', err => {
    console.log('mongoose error: ' + err);
})

dbi.once('open', () => {
    console.log('mongoose connection successful.');
})

//Routes
app.use(require('./controllers'))


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  