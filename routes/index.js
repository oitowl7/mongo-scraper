const express = require('express'),
    router = express.Router();

module.exports = function(router) {
    router.get('/three', function(req, res, next) {
      res.send('OK');
    });
}