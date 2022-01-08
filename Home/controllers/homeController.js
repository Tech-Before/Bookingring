// HomePage
const home = (req, res, next) => res.render('./pages/HomePage/home');

// Services (Appartments)
const appartments = (req, res, next) => res.render('./pages/Appartments/appartments');
const allappartments = (req, res, next) => res.render('./pages/Appartments/allappartments');
const apartmentBooking = (req, res, next) => res.render('./pages/Appartments/apartmentBooking');

const appartmentGallery = (req, res, next) => res.render('./pages/Appartments/appartmentGallery');
const hotels = (req, res, next) => res.render('./pages/Appartments/hotels');
const hotelGallery = (req, res, next) => res.render('./pages/Appartments/hotelGallery');
const hotelRooms = (req, res, next) => res.render('./pages/Appartments/hotelRooms');
const vehicles = (req, res, next) => res.render('./pages/Appartments/vehicles');
const vehicleBooking = (req, res, next) => res.render('./pages/Appartments/vehicleBooking');
const galleryAppRoom = (req, res, next) => res.render('./pages/Appartments/galleryAppRoom');
const roomBooking = (req, res, next) => res.render('./pages/Appartments/roomBooking');

// Tours 
const tours = (req, res, next) => res.render('./pages/Tours/tours');
const hike = (req, res, next) => res.render('./pages/Tours/hike');
const booking = (req, res, next) => res.render('./pages/Tours/booking');

const gallerytandh = (req, res, next) => res.render('./pages/Tours/gallerytandh');

// News
const news = (req, res, next) => res.render('./pages/News/news');
const exploreNews = (req, res, next) => res.render('./pages/News/exploreNews');

// About Us
const about = (req, res, next) => res.render('./pages/About/about');

// Contact 
const contact = (req, res, next) => res.render('./pages/Contact/contact');

// User
const login = (req, res, next) => res.render('./pages/User/login');
const signup = (req, res, next) => res.render('./pages/User/signup');
const verification = (req, res, next) => res.render('./pages/User/verification');
const forgotPassword = (req, res, next) => res.render('./pages/User/forgotPassword');
const passwordReset = (req, res, next) => res.render('./pages/User/passwordReset');


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
    login, signup, verification, forgotPassword, passwordReset,

    // Terms And Conditions
    termsAndCondition,

    // FAQ's
    faqs
}