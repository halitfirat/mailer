const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Email = mongoose.model('emails');

module.exports = (app) => {
  app.post('/api/emails', requireLogin, async (req, res) => {
    const { replyTo, to, subject, text } = req.body;

    const msg = {
      to,
      from: 'entwikla@gmail.com',
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

  app.get('/api/emails', requireLogin, async (req, res) => {
    const response = await Email.find({
      _user: req.user._id
    }).exec();

    res.send(response);
  });

  app.delete('/api/emails/:emailId', async (req, res) => {
    await Email.findOneAndDelete({ _id: req.params.emailId });

    res.send({});
  });

  app.put('/api/emails/:emailId', (req, res) => {
    Email.findOneAndUpdate(
      { _id: req.params.emailId },
      req.body,
      { new: true },
      (error, updatedRecord) => {
        if (error) {
          res.status(500).send({ error });
        } else {
          res.send(updatedRecord);
        }
      }
    );
  });
};
