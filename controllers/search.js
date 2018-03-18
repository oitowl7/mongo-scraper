const express = require('express');
let router = express.Router();
const db = require("../models");

//route not working...commented out to work on later
// router.get('/:term', (req, res) => {
//     let term = req.params.term;
//     db.Headline.find({title: {$regex : `/^${term}/i`}}, function(err, data){
//         console.log(data);
//     }).then(data => {
//         res.send(data);
//     })
// })



module.exports = router