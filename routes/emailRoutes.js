const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Email = mongoose.model('emails');

module.exports = (app) => {
  app.post('/api/emails', requireLogin, async (req, res) => {
    const { replyTo, to, subject, text } = req.body;

    const msg = {
      to, // Change to your recipient
      from: 'entwikla@gmail.com', // Change to your verified sender
      subject,
      text,
      html: `<h3>${text}</h3>`,
      replyTo
    };

    const response = await sgMail.send(msg);

    if (response[0].statusCode === 202) {
      await new Email({
        sent: response[0].headers.date,
        replyTo,
        to: to,
        subject,
        text,
        _user: req.user._id
      }).save();
    }

    res.send(response);
  });
};
