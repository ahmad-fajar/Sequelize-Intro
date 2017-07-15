'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res) => {
  model.Student.findAll()
  .then(student_data => {
    res.render('students', {student_data : student_data});
  });
});


// edit student
router.get('/edit/:id', (req, res) => {
  model.Student.findById(req.params.id)
  .then(data => {
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


// add student
router.get('/addstudent', (req, res) => {
  res.render('addstudent');
});

router.post('/addstudent', (req, res) => {
  // karena isi req body (key / attribut-nya) sama jumlah dan namanya dengan table.
  // kalo demikian, bisa dipendekin jadi
  // model.Student.create(req.body)
  // .then ...
  model.Student.create({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    email : `${req.body.email}`,
    cratedAt : new Date(),
    updatedAt : new Date()
  })
  .then(() => {
    res.redirect('/students');
  })
  .catch(err => {
    console.log(err);
    res.render('addstudent', {err : err});
  })
});

// delete student
router.get('/delete/:id', (req, res) => {
  model.Student.destroy({
    where: {
      id : `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/students');
  });
});

// add subject to students
router.get('/addsubject/:id', (req, res) => {
  // res.send('aaa');
  model.Student.findById(req.params.id)
  .then(student_data => {
    // console.log(data);
    model.Subject.findAll()
    .then(subject_list => {
      res.render('addstudentsubject', {student_data : student_data, subject_list : subject_list})
    });
  });
});

router.post('/addsubject/:id', (req, res) => {
  model.StudentSubject.create({
    StudentsId : req.params.id,
    SubjectsId : req.body.SubjectsId
  })
  .then(() => {
    res.redirect('/students')
  })
})

module.exports = router;