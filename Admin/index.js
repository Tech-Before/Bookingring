require('dotenv').config()
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')
const app = express();
const port = 3000;

//configuring of file destination and name
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/');
  },
  filename: (req, file, cb) => {
    let date = new Date().toISOString().replaceAll(":", "-");
    cb(null, date + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public')));
app.use(homeRoutes.routes)

// app.listen(port, ()=> console.log(`App listening on ${port}`))
mongoose
  .connect(
    process.env.DB_Credentials
  )
  .then(result => {
    app.listen(port, ()=> console.log(`App listening on Port: ${port}`));
  })
  .catch(err => {
    console.log(err);
  });
