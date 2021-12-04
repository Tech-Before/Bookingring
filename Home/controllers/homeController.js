// HomePage
const home = (req, res, next) => res.render('./pages/HomePage/home');

// Appartments
const appartments = (req, res, next) => res.render('./pages/Appartments/appartments');
const hotelRooms = (req, res, next) => res.render('./pages/Appartments/hotelRooms');

module.exports = {
    // HomePage
    home,

    // Appartments
    appartments, hotelRooms
}