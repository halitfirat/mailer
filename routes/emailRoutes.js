const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (app) => {
  app.post('/api/emails', async (req, res) => {
    const { replyTo, to, subject, text } = req.body;
    console.log(req.body);

    const msg = {
      to, // Change to your recipient
      from: 'entwikla@gmail.com', // Change to your verified sender
      subject,
      text,
      html: `<h3>${text}</h3>`,
      replyTo
    };

    const response = await sgMail.send(msg);
    res.send(response);
  });
};
