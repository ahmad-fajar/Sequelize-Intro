'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session ({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true,
  cookie: {}
}))

// routing
const index    = require('./routers/index');
const teachers = require('./routers/teachers');
const students = require('./routers/students');
const subjects = require('./routers/subjects');


app.use('/', index);
app.use('/teachers', teachers);
app.use('/students', students);
app.use('/subjects', subjects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('listening on port 3000...');
})

