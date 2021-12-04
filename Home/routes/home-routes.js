const express = require('express');

const {
    // HomePage
    home,

    // Appartment
    appartments

} = require('../controllers/homeController');
const router = express.Router();

// HomePage
router.get('/', home)

// Appartment
router.get('/Appartments/appartments', appartments)

module.exports = {
    routes: router
}