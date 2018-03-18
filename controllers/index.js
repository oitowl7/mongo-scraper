const express = require('express');
let router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");


router.use('/fetch', require('./fetch.js'));
router.use('/saved', require('./saved.js'));
router.use('/search', require('./search.js'));
router.use('/api', require('./api.js'));

//main page route
router.get('/', (req, res) => {
    var nothing;
    db.Headline.find({})
    .then((data) => {
        let dataToDom = {
            data: []
        }
        for (var i = 0; i < data.length; i++) {
            if (!data[i].saved) {
               dataToDom.data.push(data[i])
            }
        }
        res.render('home', dataToDom)
    }).catch((err) => {

    })
})

// changes "saved" field 
router.put('/save/:id', (req, res) => {
    const id = req.params.id;
    db.Headline.update({_id: req.params.id}, { $set: {saved: true}}, (err, results) => {
    }).then((data) => {
        res.send("complete");
    }).catch(err => {
        
    })
})


module.exports = router;