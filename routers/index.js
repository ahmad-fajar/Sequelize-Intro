'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res, next) => {
  console.log(req.session);
  // let currentUser = {user : req.session.user || null, role : req.session.role}
  res.render('index', {pagetitle : 'Home', currentUser : {user : req.session.user || null, role : req.session.role || null}});
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    pagetitle : 'Login',
    currentUser : {user : req.session.user || null, role : req.session.role || null}
  })
})

router.post('/login', (req, res, next) => {
  model.User.findOne({ where : { username : req.body.username } })
  .then(data => {
    if (data && data.password === req.body.password) {
      req.session.user = data.username;
      req.session.role = data.role;
      res.redirect('/')
    } else {
      // res.send('Wrong username or password')
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
  // res.send('logged out')
})


router.get('/signup', (req, res, next) => {
  res.render('signup', {pagetitle : 'Home', currentUser : {user : req.session.user || null, role : req.session.role || null}});
})

module.exports = router;


