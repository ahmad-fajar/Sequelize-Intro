'use strict'
const router = require('express').Router();
const model = require('../models');
const letterScore = require('../helpers/letterscore.js');


router.use((req,res, next)=>{
  // console.log(req.session.role);
  if (req.session.role == undefined) {
    res.redirect('/login');
  } else if (req.session.role == 'Academic' || req.session.role == 'Headmaster') {
    next();
  } else {
    res.send('Insufficient access')
  }
})


router.get('/', (req, res) => {
  model.Subject.findAll({
    include : [model.Teacher],
    order : [['subject_name', 'ASC']]
  })
  .then(data => {
    res.render('subjects', {
      pagetitle : 'Subjects',
      data : data,
      currentUser : req.session.user || null
    });
  });
});


// enrolled students
router.get('/:id/enrolledstudents', (req, res) => {
  model.Subject.findById(req.params.id)
  .then(subject_data => {
    model.StudentSubject.findAll({
      where : {
        SubjectId : req.params.id
      },
      include : [model.Student],
      order : [['Student', 'first_name', 'ASC']]
    })
    .then(student_data => {
      res.render('enrolledstudents', {
        pagetitle : 'Enrolled Students',
        subject_data : subject_data,
        student_data : letterScore(student_data),
        currentUser : req.session.user || null
      });
    });
  });
});


// addscores
router.get('/:sbj_id/:conj_id/givescore', (req, res) => {
  model.StudentSubject.findById(req.params.conj_id, {
    include : [model.Student, model.Subject]
  })
  .then(data => {
    // console.log(data);
    res.render('givescore', {
      pagetitle : 'Add Score',
      data : data,
      currentUser : req.session.user || null
    });
  });
});

router.post('/:sbj_id/:conj_id/givescore', (req, res) => {
  model.StudentSubject.update({
    score : req.body.score
  }, {
    where : {
      id : req.params.conj_id
    }
  })
  .then(() => {
    res.redirect(`/subjects/${req.params.sbj_id}/enrolledstudents`)
  });
});

module.exports = router;