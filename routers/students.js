'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res) => {
  model.Student.findAll()
  .then(data => {
    res.render('students', {data : data});
  });
});


module.exports = router;