const express = require('express');
let router = express.Router();

router.use('/fetch', require('./fetch.js'));
router.use('/headline', require('./headline.js'));
router.use('/note', require('./note.js'));
router.use('/fetch', require('./fetch.js'));
router.use('/api', require('./api.js'));

router.get('/', (req, res) => {
    res.send("index route works");
})

module.exports = router;