// Dashboard
const indexView = (req, res, next) => {
    res.render('./pages/Home/home');
}

// Areas
const addArea = (req, res, next) => {
    res.render('./pages/Areas/addAreas');
}

const listAreas = (req, res, next) => {
    res.render('./pages/Areas/areaList');
}

// Customers
const customersList = (req, res, next) => {
    res.render('./pages/Customers/customer')
}

// Hotels Clients
const hotelClients = (req, res, next) => {
    res.render('./pages/Hotels/addHotel')
}

const hotelList = (req, res, next) => {
    res.render('./pages/Hotels/hotelsList')
}

const hotelApproved = (req, res, next) => {
    res.render('./pages/Hotels/approvedHotels')
}

const hotelUnapproved = (req, res, next) => {
    res.render('./pages/Hotels/unapprovedHotels')
}

const addGalleryHotel = (req, res, next) => {
    res.render('./pages/Hotels/addHotelGallery')
}

// Appartments / Houses
const appartmentsHouses = (req, res, next) => {
    res.render('./pages/Appartments/addAppartment')
}

const appartmentsApproved = (req, res, next) => {
    res.render('./pages/Appartments/appartmentApprovedList')
}

const approvedappartmentsUnapproved = (req, res, next) => {
    res.render('./pages/Appartments/appartmentUnapprovedList')
}

const addGalleryAppartment = (req, res, next) => {
    res.render('./pages/Appartments/addGalleryAppartments')
}

const appartmentList = (req, res, next) => {
    res.render('./pages/Appartments/appartmentList')
}

const housesList = (req, res, next) => {
    res.render('./pages/Appartments/housesList')
}

// Vehicle
const addVehicle = (req, res, next) => {
    res.render('./pages/Vehicles/addVehicles')
}

const vehicleList = (req, res, next) => {
    res.render('./pages/Vehicles/vehicleList')
}

// Company Info
const aboutUs = (req, res, next) => {
    res.render('./pages/CompanyInfo/aboutUs')
}

const contactUs = (req, res, next) => {
    res.render('./pages/CompanyInfo/contactUs')
}

// Updates / Blog
const addUpdates = (req, res, next) => {
    res.render('./pages/Updates/addUpdates')
}

const updateList = (req, res, next) => {
    res.render('./pages/Updates/updateList')
}

// Services
const addServices = (req, res, next) => {
    res.render('/pages/Services/addServices')
}

const servicesList = (req, res, next) => {
    res.render('./pages/Services/servicesList')
}

module.exports = {
    indexView,
    addArea,
    listAreas,
    customersList,
    hotelClients,
    hotelList,
    hotelApproved,
    hotelUnapproved,
    addGalleryHotel,
    appartmentsHouses,
    appartmentsApproved,
    approvedappartmentsUnapproved,
    addGalleryAppartment,
    appartmentList,
    housesList,
    addVehicle,
    vehicleList,
    aboutUs,
    contactUs,
    addUpdates,
    updateList,
    addServices,
    servicesList
}