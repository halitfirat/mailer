const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/api/login/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/api/return',
    passport.authenticate('google', { failureRedirect: '/api/login/google' }),
    function (req, res) {
      res.redirect('/emails');
    }
  );

  app.get('/api/user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
