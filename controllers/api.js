const express = require('express');
let router = express.Router();
const db = require("../models");


router.get("/notes/:id", (req, res) => {
    db.Note.find({ _id: req.params.id })
    .then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;
