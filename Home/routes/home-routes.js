const express = require('express');

const {
    indexView
} = require('../controllers/homeController');
const router = express.Router();

router.get('/', indexView)

// Areas
// router.get('/Areas/addAreas', addArea)

module.exports = {
    routes: router
}