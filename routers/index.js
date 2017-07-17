'use strict'
const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('index', {pagetitle : 'Home'});
});

router.get('/login', (req, res, next) => {
  res.render('login', {pagetitle : 'Login'})
})

router.get('/logout', (req, res, next) => {
  res.send('logout page')
})


module.exports = router;


