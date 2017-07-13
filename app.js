'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routing
const index    = require('./routers/index');
const teachers = require('./routers/teachers');
const students = require('./routers/students');
const subjects = require('./routers/subjects');


app.use('/', index);
app.use('/teachers', teachers);
app.use('/students', students);
app.use('/subjects', subjects);



app.listen(3000, () => {
  console.log('listening on port 3000...');
})

