const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 8080;

// MIDDLEWARE

/** Morgan is the logger middleware for express,
 * which is useful for debugging,
 * but not necessary. */
app.use(morgan('dev'));

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Routing
app.post('/signup', (req, res, next) => {
  console.log('server post username: ');
  console.log(req.body.username);
  res.end();
});

// Starting server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
