const express = require('express');
let router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
    db.Headline.aggregate([ { $sortByCount: "$subReddit" }]).limit(10)
    .then(data => {
        const dataToDom = {
            data
        }
        res.render('sort', dataToDom)
    })
})




module.exports = router;