'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res) => {
  model.Student.findAll()
  .then(data => {
    res.render('students', {data : data});
  });
});


// edit
router.get('/edit/:id', (req, res) => {
  model.Student.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(data => {
    // console.log(data);
    res.render('editstudent', {data : data});
  });
});

router.post('/edit/:id', (req, res) => {
  model.Student.update({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    email : `${req.body.email}`
  }, {
    where: {
      id : `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/students');
  });
});


// add
router.get('/addstudent', (req, res) => {
  res.render('addstudent');
});


module.exports = router;