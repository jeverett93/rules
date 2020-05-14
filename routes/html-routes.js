const path = require('path');
var isAuthenticated = require('../config/middleware/isAuthenticated');
module.exports = function (app) {

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, 'about.html'));
  });

  app.get('/addGame', isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, 'addGame.html'));
  });
  app.get('/signup', function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });

  app.get('/login', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/member');
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });
  // Route for logging user out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/member', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../public/member.html'));
  });
};
