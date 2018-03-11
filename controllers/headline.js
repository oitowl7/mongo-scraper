const express = require('express');
let router = express.Router();


router.get('/', function(req, res) {
  res.send('headline route works');
});

module.exports = router;

