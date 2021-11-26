const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(express.json());

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public')));
app.use(homeRoutes.routes)

// app.listen(port, ()=> console.log(`App listening on ${port}`))
mongoose
  .connect(
    'mongodb+srv://mrobot:bookingring1234543216789009876@cluster0.xjk47.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(port, ()=> console.log(`App listening on Port: ${port}`));
  })
  .catch(err => {
    console.log(err);
  });
