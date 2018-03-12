const express = require('express');
let router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoScraper", {
//   useMongoClient: true
});

router.use('/fetch', require('./fetch.js'));
router.use('/saved', require('./saved.js'));
router.use('/note', require('./note.js'));
// router.use('/', require('./slash.js'));
router.use('/api', require('./api.js'));

router.get('/', (req, res) => {
    var nothing;
    db.Headline.find({})
    .then((data) => {
        let dataToDom = {
            data: []
        }
        for (var i = 0; i < data.length; i++) {
            dataToDom.data.push(data[i])
        }
        res.render('home', dataToDom)
        // res.json(dataToDom.data);
    }).catch((err) => {

    })
})

router.get('/delete', (req, res) => {
    db.Headline.remove();
    res.send("collection removed");
})

router.put('/save/:id', (req, res) => {
    const id = req.params.id;
    // db.Headline.findOneAndUpdate({_id: id}, { $set: {saved: true}}, (err, results) => {
    //     // console.log(results.result.nModified);
    //     console.log(results);
    // }).done(res.send("complete"))
    db.Headline.update({_id: req.params.id}, { $set: {saved: true}}, (err, results) => {
        console.log(results);
    }).then((data) => {
        res.send("complete");
    }).catch(err => {
        
    })
})

// db.ships.update({name : 'USS Something'},
//  {$set : {operator : 'Starfleet', class : 'Prometheus'}})


module.exports = router;