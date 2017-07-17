'use strict'
const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('index', {pagetitle : 'Home'});
});


module.exports = router;


