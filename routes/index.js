var express = require('express');
var router = express.Router();
var validator = require('express-validator');
//const { checkSchema } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Portfolio' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About me page' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Page' });
});

/* GET blog page. */
router.get('/blog', function(req, res, next) {
  res.render('blog', { layout: 'layout-blog', title: 'My blog list' });
});

/* GET blog detail page. */
router.get('/blog/:name', function(req, res, next) {
  res.render('blog-detail', { layout: 'layout-blog', title: 'Blog Detail Page' });
});

/* GET project list page. */
router.get('/project', function(req, res, next) {
  res.render('project', { title: 'My project list' });
});

/* GET project detail page. */
router.get('/project/:project-name', function(req, res, next) {
  res.render('project-details', { title: 'Project Detail Page' });
});

/* GET my resume pdf. */
router.get('/resume', function(req, res, next) {
res.render('resume', { title: 'This is my resume page' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { layout:'layout-login',title: 'Project Detail Page' });
});


/* POST handle login. */
router.post('/login', function(req, res, next) {
  req.checkBody('email', 'Email is required').
      notEmpty().withMessage('Please enter a valid email');
  req.checkBody('password', 'Password is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
        messages.push(error.msg);
    });
    res.render('login', {layout:'layout-login', hasErrors: messages.length > 0,messages: errors});
  }else{
    // lets assume we are have the following list of users
    var users = [
      {email:'manohar@hurreh.com',password:'abcd'},
      {email:'arijit@gmail.com',password:'test'},
      {email:'mrinmoy@gmail.com',password:'pqrs'},
      {email:'koustav@gmail.com',password:'mnop'},
    ];

    var found = false;

    for(i=0;i<users.length;i++){
      if(users[i].email === req.body.email &&  users[i].password === req.body.password){
        found = true;
        break;
      }
    }

    if(found){
      req.session.isLoggedIn = true;
      req.session.user = {'email': req.body.email};
      res.locals.session = req.session;
      res.render('profile', {title: 'Project Detail Page' });
    }else{
      var messages = [];
      messages.push({msg:'Invalid login credentials'});
      res.render('login', {layout:'layout-login', hasErrors: messages.length > 0,messages: messages});
    }
  }
});

module.exports = router;
