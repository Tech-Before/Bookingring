const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes')


const app = express();
const port = 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public')));
app.use(homeRoutes.routes)

app.listen(port, ()=> console.log(`App listening on ${port}`))