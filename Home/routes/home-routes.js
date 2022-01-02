const express = require('express');

const {
    // HomePage
    home,

    // Services (Appartments)
    appartments, allappartments, apartmentBooking, appartmentGallery, hotels, hotelGallery, hotelRooms, vehicles, vehicleBooking, galleryAppRoom, roomBooking,

    // Tours
    tours, hike, booking, gallerytandh,

    // News
    news, exploreNews,

    // About Us
    about,

    // Contact
    contact,

    // User
    login, signup,

    // Terms And Conditions
    termsAndCondition

} = require('../controllers/homeController');
const router = express.Router();

// HomePage
router.get('/', home)

// Services (Appartments)
router.get('/Appartments/appartments', appartments)
router.get('/Appartments/allappartments', allappartments)
router.get('/Appartments/apartmentBooking', apartmentBooking)
router.get('/Appartments/appartmentGallery', appartmentGallery)
router.get('/Appartments/hotels', hotels)
router.get('/Appartments/hotelGallery', hotelGallery)
router.get('/Appartments/hotelRooms', hotelRooms)
router.get('/Appartments/vehicles', vehicles)
router.get('/Appartments/vehicleBooking', vehicleBooking)
router.get('/Appartments/galleryAppRoom', galleryAppRoom)
router.get('/Appartments/roomBooking', roomBooking)

// Tours
router.get('/Tours/tours', tours)
router.get('/Tours/hike', hike)
router.get('/Tours/booking', booking)
router.get('/Tours/gallerytandh', gallerytandh)

// News
router.get('/News/news', news)
router.get('/News/exploreNews', exploreNews)

// About Us
router.get('/About/about', about)

// Contact
router.get('/Contact/contact', contact)

// User
router.get('/User/login', login)
router.get('/User/signup', signup)

// Terms And Conditions
router.get('/TermsConditions/termsAndCondition', termsAndCondition)


module.exports = {
    routes: router
}