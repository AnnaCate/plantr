const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dbConnection = require('./database');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');

// route requires
const user = require('./routes/user');
const plants = require('./routes/plants');

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

// SESSIONS
app.use(
  session({
    secret: 'baby-tiger',
    store: new MongoStore({mongooseConnection: dbConnection}),
    resave: false,
    saveUninitialized: false,
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/user', user);
app.use('/plants', plants);

// Starting server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
