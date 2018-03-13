const express = require('express');
let router = express.Router();
const db = require("../models");


router.get("/notes/:id", (req, res) => {
    db.Headline.find({ _id: req.params.id }).populate('note')
    .then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;
