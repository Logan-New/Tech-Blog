const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection'); // Adjust path if necessary
const routes = require('./routes'); // Adjust path if necessary

const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware setup
app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes); // Ensure your routes file is correctly referenced

// Sync Sequelize and start the server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
