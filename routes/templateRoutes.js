const mongoose = require('mongoose');

const Template = mongoose.model('templates');

module.exports = (app) => {
  app.post('/api/templates', async (req, res) => {
    const { replyTo, to, subject, text } = req.body;

    const response = await new Template({
      replyTo,
      to,
      subject,
      text,
      _user: req.user._id
    }).save();

    res.send(response);
  });

  app.get('/api/templates', async (req, res) => {
    const response = await Template.find({ _user: req.user._id }).exec();

    res.send(response);
  });

  app.delete('/api/templates/:templateId', async (req, res) => {
    const response = await Template.findOneAndDelete({
      _id: req.params.templateId
    });

    res.send(response);
  });

  app.put('/api/templates/:templateId', async (req, res) => {
    const { replyTo, to, subject, text } = req.body;

    Template.findOneAndUpdate(
      { _id: req.params.templateId },
      { replyTo, to, subject, text },
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
