const express = require('express');
let router = express.Router();
const db = require("../models");


router.get('/', function(req, res) {
    let nothing;
    db.Headline.find({"saved": true})
    .then((data) => {
        let dataToDom = {
            data: []
        }
        for (var i = 0; i < data.length; i++) {
            dataToDom.data.push(data[i])
        }
        res.render('saved', dataToDom)
        // res.json(dataToDom.data);
    }).catch((err) => {

    })
});

router.put('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.Headline.update({_id: req.params.id}, { $set: {saved: false}}, (err, results) => {
        console.log(results);
    }).then((data) => {
        res.send("complete");
    }).catch(err => {
        
    })
})

router.post('/newnote/:id', (req, res) => {
    db.Note.create(req.body)
    .then( data => {
        console.log(data);
        return db.Headline.update({_id: req.params.id}, { $push: {note: data._id }}, {new: true});
    })
    .then(data2 => {
        res.json(data2)
    })
    .catch( err => {
        res.json(err);
    })
})
module.exports = router;
