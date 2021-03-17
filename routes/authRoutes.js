const passport = require('passport');

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.render('home', { user: req.user });
  });

  app.get('/login', function (req, res) {
    res.render('login');
  });

  app.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.get(
    '/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
      res.render('profile', req);
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.send('Yourre loggedout');
  });
};
