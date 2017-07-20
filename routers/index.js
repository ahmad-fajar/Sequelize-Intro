'use strict'
const router = require('express').Router();
const model = require('../models')
const crypt = require('../helpers/crypt')
const keygen = require('../helpers/keygen.js')


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
    let pass = crypt(req.body.password, data.salt)
    if (data.password === req.body.password || data.password === pass) {
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

// sign up
router.get('/signup', (req, res, next) => {
  res.render('signup', {pagetitle : 'Home', currentUser : {user : req.session.user || null, role : req.session.role || null}});
})

router.post('/signup', (req, res, next) => {
  // res.send('signup page')
  model.User.create(req.body)
  // console.log(req.body)
  .then(() => {
    res.redirect('/')
  })
})

module.exports = router;


