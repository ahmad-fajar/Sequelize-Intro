'use strict'
const router = require('express').Router();
const model = require('../models')


router.use((req,res, next)=>{
  // console.log(req.session.role);
  if (req.session.role == undefined) {
    res.redirect('/login');
  } else if (req.session.role == 'Academic' || req.session.role == 'Headmaster' || req.session.role == 'Teacher') {
    next();
  } else {
    res.send('Insufficient access')
  }
})

router.get('/', (req, res) => {
  model.Student.findAll({
    order : [['first_name', 'ASC']],
  })
  .then(student_data => {
    res.render('students', {
      pagetitle : 'Students',
      student_data : student_data,
      currentUser : {user : req.session.user || null, role : req.session.role || null}
    });
  });
});


// edit student
router.get('/edit/:id', (req, res) => {
  model.Student.findById(req.params.id)
  .then(data => {
    res.render('editstudent', {
      pagetitle : 'Edit Students',
      data : data,

    });
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
  res.render('addstudent', {
    pagetitle : 'Add Student',
    currentUser : {user : req.session.user || null, role : req.session.role || null}
  });
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
    // console.log(err);
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
  model.Student.findById(req.params.id)
  .then(student_data => {
    model.Subject.findAll()
    .then(subject_list => {
      res.render('addstudentsubject', {
        pagetitle : 'Add Subject to Student',
        student_data : student_data,
        subject_list : subject_list,
        currentUser : {user : req.session.user || null, role : req.session.role || null}
      });
    });
  });
});

router.post('/addsubject/:id', (req, res) => {
  model.StudentSubject.create({
    StudentId : req.params.id,
    SubjectId : req.body.SubjectId
  })
  .then(() => {
    res.redirect('/students')
  })
})

module.exports = router;