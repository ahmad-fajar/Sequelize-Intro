'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res) => {
  model.Teacher.findAll()
  .then(data => {
    // console.log(data);
    res.render('teachers', {data : data});
  });
});

// router.get('/', (req, res) => {
//   res.render('teachers');
// });


module.exports = router;