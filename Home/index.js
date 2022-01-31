require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cookieParser('SecretStringForCookies'));
app.use(flash());

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public')));
app.use(homeRoutes.routes)

const port = process.env.port || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xjk47.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(result => {
    app.listen(port, () => console.log(`App listening on Port: ${port}`));
  })
  .catch(err => {
    console.log(err);
  });
