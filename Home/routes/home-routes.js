const express = require('express');

const {
    // HomePage
    home,

    // Appartment
    appartments, hotelRooms

} = require('../controllers/homeController');
const router = express.Router();

// HomePage
router.get('/', home)

// Appartment
router.get('/Appartments/appartments', appartments)
router.get('/Appartments/hotelRooms', hotelRooms)

module.exports = {
    routes: router
}