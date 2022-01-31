const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const HomeModel = require('../models/homeModel');
const AreasModel = require('../models/locationsModel');
const AppartmentModel = require('../models/appartmentsModel');
const HotelsModel = require('../models/hotelsModel');
const VehiclesModel = require('../models/vehiclesModel');
const ToursModel = require('../models/toursModel');
const NewsModel = require('../models/newsModel');
const UsersModel = require('../models/usersModel');

// HomePage
const home = async (req, res, next) => {
    const areas = await HomeModel.fetchAreas();
    res.render('./pages/HomePage/home', {
        areas: areas
    });
}

// Services (Appartments)
const appartments = (req, res, next) => res.render('./pages/Appartments/appartments');
const allappartments = async (req, res, next) => {
    //areas
    const areas = await AreasModel.fetchAreas();
    //fetch appartments
    const appartments = await AppartmentModel.fetchAppartments();
    res.render('./pages/Appartments/allappartments', {
        areas: areas,
        appartments: appartments
    });
}
const apartmentBooking = (req, res, next) => res.render('./pages/Appartments/apartmentBooking');

const appartmentGallery = (req, res, next) => res.render('./pages/Appartments/appartmentGallery');
const hotels = async (req, res, next) => {
    //areas
    const areas = await AreasModel.fetchAreas();
    //hotels
    const hotels = await HotelsModel.fetchHotels();
    res.render('./pages/Appartments/hotels', {
        hotels: hotels,
        areas: areas
    });
    
}
const hotelGallery = (req, res, next) => res.render('./pages/Appartments/hotelGallery');
const hotelRooms = (req, res, next) => res.render('./pages/Appartments/hotelRooms');
const vehicles = async (req, res, next) => {
    //areas
    const areas = await AreasModel.fetchAreas();
    //vehicles
    const vehicles = await VehiclesModel.fetchVehicles();
    res.render('./pages/Appartments/vehicles', {
        areas: areas,
        vehicles: vehicles
    });
}
const vehicleBooking = (req, res, next) => res.render('./pages/Appartments/vehicleBooking');
const galleryAppRoom = (req, res, next) => res.render('./pages/Appartments/galleryAppRoom');
const roomBooking = (req, res, next) => res.render('./pages/Appartments/roomBooking');

// Tours 
const tours = async (req, res, next) => {
    const areas = await AreasModel.fetchAreas();
    const tours = await ToursModel.fetchTours();
    const hikes = await ToursModel.fetchHikes();
    res.render('./pages/Tours/tours', {
        areas: areas,
        tours: tours,
        hikes: hikes
    });
}
const hike = (req, res, next) => res.render('./pages/Tours/hike');
const booking = (req, res, next) => res.render('./pages/Tours/booking');

const gallerytandh = (req, res, next) => res.render('./pages/Tours/gallerytandh');

// News
const news = async (req, res, next) => {
    const news = await NewsModel.fetchNews();
    res.render('./pages/News/news', {news: news});
}
const exploreNews = async (req, res, next) => {
    const id = req.params.id;
    try {
      const post = await NewsModel.fetchOne(id);
      res.render("./pages/News/exploreNews", { post: post });
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
    
}

// About Us
const about = (req, res, next) => res.render('./pages/About/about');

// Contact 
const contact = (req, res, next) => res.render('./pages/Contact/contact');

// User
const login = (req, res, next) => res.render('./pages/User/login');
const signup = (req, res, next) => {
    res.render('./pages/User/signup', {
        oldInput: {
            name: '',
            phoneNo: '',
            email: '',
            password: ''
        }
    });
}
const verification = (req, res, next) => res.render('./pages/User/verification');
const forgotPassword = (req, res, next) => res.render('./pages/User/forgotPassword');
const passwordReset = (req, res, next) => res.render('./pages/User/passwordReset');

const postSignUp = async (req, res) => {

    const name = req.body.name;
    const contact = req.body.phoneNo;
    const email = req.body.email;
    const password = req.body.password;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
      return res.status(422).render("../views/pages/User/signup", {
        path: "/Users/addUser",
        pageTitle: "Add User",
        oldInput: {
          name: name,
          phoneNo: contact,
          email: email,
          password: password,
        },
        validationErrors: errors.array(),
      });
    }
    
  // generate salt to hash password
  const salt = await bcrypt.genSalt(16);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new UsersModel({
    name: name,
    phoneNo: contact,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
    console.log("Added user");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
}

// Terms And Conditions
const termsAndCondition = (req, res, next) => res.render('./pages/TermsConditions/termsAndCondition');

// FAQ's
const faqs = (req, res, next) => res.render('./pages/FAQs/faqs');

module.exports = {
    // HomePage
    home,

    // Services (Appartments)
    appartments, allappartments, apartmentBooking, appartmentGallery, hotels, hotelGallery, hotelRooms, vehicles, vehicleBooking, galleryAppRoom, roomBooking,

    // Tours
    tours, hike, booking, gallerytandh,

    // News
    news, exploreNews,

    // About
    about,

    // Contact
    contact,

    // User
    login, signup, verification, forgotPassword, passwordReset, postSignUp,

    // Terms And Conditions
    termsAndCondition,

    // FAQ's
    faqs
}