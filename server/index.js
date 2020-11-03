const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send(err.message || "Oops! There's an error on our end.");
});

module.exports = app;
