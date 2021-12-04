// HomePage
const home = (req, res, next) => res.render('./pages/HomePage/home');

// Services (Appartments)
const appartments = (req, res, next) => res.render('./pages/Appartments/appartments');
const hotelRooms = (req, res, next) => res.render('./pages/Appartments/hotelRooms');
const vehicles = (req, res, next) => res.render('./pages/Appartments/vehicles');
const galleryAppRoom = (req, res, next) => res.render('./pages/Appartments/galleryAppRoom');

// Tours
const tours = (req, res, next) => res.render('./pages/Tours/tours');
const hike = (req, res, next) => res.render('./pages/Tours/hike');
const gallerytandh = (req, res, next) => res.render('./pages/Tours/gallerytandh');

// News
const news = (req, res, next) => res.render('./pages/News/news');

// About Us
const about = (req, res, next) => res.render('./pages/About/about');

// Contact 
const contact = (req, res, next) => res.render('./pages/Contact/contact');

module.exports = {
    // HomePage
    home,

    // Services (Appartments)
    appartments, hotelRooms, vehicles, galleryAppRoom,

    // Tours
    tours, hike, gallerytandh,

    // News
    news,

    // About
    about,

    // Contact
    contact
}