const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ youre: 'online' });
});

app.get('/change', (req, res) => {
  res.send({ confirm: 'change' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
