'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res, next) => {
  // console.log(req.session);
  let currentUser = req.session.user || null
  res.render('index', {pagetitle : 'Home', currentUser : req.session.user || null});
});

router.get('/login', (req, res, next) => {
  let currentUser = req.session.user || null
  res.render('login', {pagetitle : 'Login', currentUser : currentUser})
})

router.post('/login', (req, res, next) => {
  model.User.findOne({ where : { username : req.body.username } })
  .then(data => {
    if (data && data.password === req.body.password) {
      req.session.user = data.username;
      req.session.role = data.role;
      res.redirect('/')
    } else {
      res.send('password salah')
    }
  })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/')
  })
  // res.send('logged out')
})


module.exports = router;


