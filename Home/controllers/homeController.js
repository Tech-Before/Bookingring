// HomePage
const home = (req, res, next) => res.render('./pages/HomePage/home');

// Appartments
const appartments = (req, res, next) => res.render('./pages/Appartments/appartments');

module.exports = {
    // HomePage
    home,

    // Appartments
    appartments
}