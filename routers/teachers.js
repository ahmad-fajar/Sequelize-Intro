'use strict'
const router = require('express').Router();
const model = require('../models')

router.use((req,res, next)=>{
  // console.log(req.session.role);
  if (req.session.role == undefined) {
    res.redirect('/login');
  } else if (req.session.role == 'Headmaster') {
    next();
  } else {
    res.send('Insufficient access')
  }
})


router.get('/', (req, res) => {
  model.Teacher.findAll({
    include : [model.Subject],
    order : [['first_name', 'ASC']]
  })
  .then(data => {
    // console.log(data);
    res.render('teachers', {
      pagetitle : 'Teachers',
      data : data,
      currentUser : {user : req.session.user || null, role : req.session.role || null}
    });
  });
});  // --> belum selesai buat ambil data subject


// edit
router.get('/edit/:id', (req, res) => {
  model.Teacher.findById(req.params.id, {include : model.Subject})
  .then(teacher_data => {
    model.Subject.findAll()
    .then(subject_data => {
      // console.log(subject_data[0].id);
      res.render('editteacher', {
        pagetitle : 'Edit Teacher\'s Data',
        teacher_data : teacher_data,
        subject_data : subject_data,
        currentUser : {user : req.session.user || null, role : req.session.role || null}
      });
    })
  });
});

router.post('/edit/:id', (req, res) => {
  model.Teacher.update({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    email : `${req.body.email}`,
    SubjectId : `${req.body.SubjectId}`
  }, {
    where: {
      id : `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/teachers');
  });
});


// add
router.get('/addteacher', (req, res) => {
  model.Subject.findAll()
  .then(data => {
    res.render('addteacher', {
      pagetitle : 'Add Teacher',
      subject_list: data,
      currentUser : {user : req.session.user || null, role : req.session.role || null}
    });
  })
});

router.post('/addteacher', (req, res) => {
  model.Teacher.create(req.body)
  .then(() => {
    res.redirect('/teachers');
  })
  .catch(err => {
    console.log(err);
  })
});

// delete
router.get('/delete/:id', (req, res) => {
  model.Teacher.destroy({
    where: {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers');
  });
});

module.exports = router;