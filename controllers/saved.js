const express = require('express');
let router = express.Router();
const db = require("../models");

// route that shows all saved articles
router.get('/', function(req, res) {
    db.Headline.find({"saved": true})
    .then((data) => {
        let dataToDom = {
            data: []
        }
        for (var i = 0; i < data.length; i++) {
            dataToDom.data.push(data[i])
        }
        res.render('saved', dataToDom)
    }).catch((err) => {

    })
});

// api call to remove an article from saved
router.put('/deletesaved/:id', (req, res) => {
    const id = req.params.id;
    db.Headline.update({_id: req.params.id}, { $set: {saved: false}}, (err, results) => {
    }).then((data) => {
        res.send("complete");
    }).catch(err => {
        
    })
})

router.post('/newnote/:id', (req, res) => {
    db.Note.create(req.body)
    .then( data => {
        return db.Headline.update({_id: req.params.id}, { $push: {note: data._id }}, {new: true});
    })
    .then(data2 => {
        res.json(data2)
    })
    .catch( err => {
        res.json(err);
    })
})

router.delete('/deletenote/:id', (req, res) => {
    db.Note.deleteOne({_id: req.params.id}, (err) => {

    })
    .then(data => res.json(data))
})
module.exports = router;

