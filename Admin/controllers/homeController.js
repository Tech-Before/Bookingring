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

const editArea = (req, res, next) => {
    res.render('./pages/Areas/editArea')
}

// Customers
const customersList = (req, res, next) => {
    res.render('./pages/Customers/customer')
}

const editMembership = (req, res, next) => {
    res.render('./pages/Customers/editMembership')
}

const viewCustomer = (req, res, next) => {
    res.render('./pages/Customers/viewCustomer')
}

// Hotels Clients
const hotelClients = (req, res, next) => {
    res.render('./pages/Hotels/addHotel')
}

const hotelList = (req, res, next) => {
    res.render('./pages/Hotels/hotelsList')
}

const viewHotel = (req, res, next) => {
    res.render('./pages/Hotels/viewHotel')
}

const editHotel = (req, res, next) => {
    res.render('./pages/Hotels/editHotel')
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

const addHotelImages = (req, res, next) => {
    res.render('./pages/Hotels/addHotelImages')
}

const galleryList = (req, res, next) => {
    res.render('./pages/Hotels/galleryList')
}

const viewHotelImages = (req, res, next) => {
    res.render('./pages/Hotels/viewHotelImages')
}

// Appartments / Houses
const appartmentsHouses = (req, res, next) => {
    res.render('./pages/Appartments/addAppartment')
}

const appartmentHouseList = (req, res, next) => {
    res.render('./pages/Appartments/appartmentHouseList')
}

const editAppartmentHouse = (req, res, next) => {
    res.render('./pages/Appartments/editAppartmentHouse')
}

const addGalleryAppartment = (req, res, next) => {
    res.render('./pages/Appartments/addGalleryAppartments')
}

const editGalleryAppartments = (req, res, next) => {
    res.render('./pages/Appartments/editGalleryAppartments')
}

const appartmentList = (req, res, next) => {
    res.render('./pages/Appartments/appartmentList')
}

const housesList = (req, res, next) => {
    res.render('./pages/Appartments/housesList')
}

const addGalleryHouses = (req, res, next) => {
    res.render('./pages/Appartments/addGalleryHouses')
}

const editGalleryHouses = (req, res, next) => {
    res.render('./pages/Appartments/editGalleryHouses')
}

// Rooms
const addRoom = (req, res, next) => {
    res.render('./pages/Rooms/addRoom')
}

const roomList = (req, res, next) => {
    res.render('./pages/Rooms/roomList')
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
    res.render('./pages/Services/addServices')
}

const servicesList = (req, res, next) => {
    res.render('./pages/Services/servicesList')
}

// Tours Plans & Hiking
const addTour = (req, res, next) => {
    res.render('./pages/Tours/addTours')
}

const tourList = (req, res, next) =>{
    res.render('./pages/Tours/toursList')
}

// Bundles and Offers
const addBundle = (req, res, next) => {
    res.render('./pages/BundleOffers/addBundle')
}

const bundleList = (req, res, next) => {
    res.render('./pages/BundleOffers/bundlesList')
}

// Slider Images
const addImagesSlider = (req, res, next) => {
    res.render('./pages/SliderImages/addSliderImages')
}

const sliderImages = (req, res, next) => {
    res.render('./pages/SliderImages/sliderImagesList')
}

// Customer Feedback
const feedback = (req, res, next) => {
    res.render('./pages/Feedback/customerFeedback')
}

// Users
const addUser = (req, res, next) => {
    res.render('./pages/Users/addUser')
}

const userList = (req, res, next) => {
    res.render('./pages/Users/usersList')
}


module.exports = {
    // Dashboard
    indexView,

    // Areas
    addArea, listAreas, editArea,

    // Customers
    customersList, viewCustomer, editMembership,
    
    // Hotels Clients
    hotelClients, hotelList, viewHotel, editHotel, hotelApproved, hotelUnapproved, addGalleryHotel, addHotelImages, galleryList, viewHotelImages,
    
    // Appartments / Houses 
    appartmentsHouses, appartmentHouseList, editAppartmentHouse, appartmentList, editGalleryAppartments, housesList, addGalleryAppartment, addGalleryHouses, editGalleryHouses,
    
    // Rooms
    addRoom, roomList,

    // Vehicle
    addVehicle, vehicleList,
    
    // Company Info
    aboutUs, contactUs,
    
    // Updates / Blog
    addUpdates, updateList,
    
    // Services
    addServices, servicesList,
    
    // Tours Plans & Hiking
    addTour, tourList,
    
    // Bundles and Offers
    addBundle, bundleList,

    // Slider Images
    addImagesSlider, sliderImages,

    // Customer Feedback
    feedback,

    // Users
    addUser, userList

}