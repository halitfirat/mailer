require('dotenv').config();

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
require('./models/User');
require('./models/Email');
require('./models/Template');
require('./services/passport');

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // sets cookie to expire in 30 days (converted to milliseconds)
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/emailRoutes')(app);
require('./routes/templateRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 8080);
