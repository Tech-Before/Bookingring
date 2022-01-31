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
    login, signup, verification, forgotPassword, passwordReset, postSignUp,

    // Terms And Conditions
    termsAndCondition,

    // FAQ's
    faqs

} = require('../controllers/homeController');
const router = express.Router();
const { body } = require("express-validator");
const UsersModel = require('../models/usersModel');

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
router.get('/News/post/:id', exploreNews)

// About Us
router.get('/About/about', about)

// Contact
router.get('/Contact/contact', contact)

// User
router.get('/User/login', login)
router.get('/User/signup', signup)
router.get('/User/verification', verification)
router.get('/User/forgotPassword', forgotPassword)
router.get('/User/passwordReset', passwordReset)
router.post(
  "/signUp",
  [
    body("name", "Please enter valid name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .trim()
      .escape(),
    body("phoneNo", "Please enter valid phone number.")
      .isLength({ min: 10, max: 13})
      .trim(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return UsersModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  postSignUp
);

// Terms And Conditions
router.get('/TermsConditions/termsAndCondition', termsAndCondition)

// FAQ's
router.get('/FAQs/faqs', faqs)


module.exports = {
    routes: router
}