const express = require('express');

const {
    home
} = require('../controllers/homeController');
const router = express.Router();


router.get('/', home)

// Areas
// router.get('/Areas/addAreas', addArea)

module.exports = {
    routes: router
}