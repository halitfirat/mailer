const passport = require('passport');

module.exports = (app) => {
  app.get('/api/home', function (req, res) {
    res.render('home', { user: req.user });
  });

  app.get('/api/login', function (req, res) {
    res.render('login');
  });

  app.get(
    '/api/login/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/api/return',
    passport.authenticate('google', { failureRedirect: '/api/login' }),
    function (req, res) {
      res.redirect('/api/home');
    }
  );

  app.get(
    '/api/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
      res.render('profile', req);
    }
  );

  app.get('/api/user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send('Yourre loggedout');
  });
};
