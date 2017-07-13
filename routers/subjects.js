'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res) => {
  model.Subject.findAll()
  .then(data => {
    res.render('subjects', {data : data});
  });
});

// router.get('/', (req, res) => {
//   res.render('subjects');
// });



module.exports = router;