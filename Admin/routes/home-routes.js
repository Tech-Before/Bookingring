const { render } = require('ejs');
const express = require('express');
const {
    // Login
    login,

    // Dashboard
    indexView,

    // Areas
    addArea, listAreas, editArea, postAddArea, postEditArea,

    // Customers
    customersList, viewCustomer, editMembership,
    
    // Hotels Clients
    hotelClients, hotelList, viewHotel, editHotel, hotelApproved, hotelUnapproved, addGalleryHotel, addHotelImages, galleryList, viewHotelImages, postAddHotel, postEditHotel, postAddHotelGallery, postDeleteGalleryImage,
    
    // Appartments / Houses 
    appartmentsHouses, appartmentHouseList, editAppartmentHouse, appartmentList, editGalleryAppartments, housesList, addGalleryAppartment, addGalleryHouses, editGalleryHouses,
    
    // Rooms
    addRoom, roomList, editRoom, addRoomGallery, editRoomGallery,

    // Vehicle
    addVehicle, vehicleList, editVehicle, addVehicleGallery, editVehicleGallery,

    // Updates / Blog
    addUpdates, updateList, editBlog, deleteBlog,
    
    // Tours Plans & Hiking
    addTour, tourList, viewTour, editTour, postAddTour, postEditTour,
    
    // Bundles and Offers
    addBundle, bundleList,

    // Slider Images
    addImagesSlider, sliderImages,

    // Customer Feedback
    feedback, viewFeedbackQuery,

    // Users
    addUser, userList, editUser

} = require('../controllers/homeController')
const router = express.Router();

// Login
router.get('/login', login);

// Dashboard
router.get('/', indexView)

// Areas
router.get('/Areas/addAreas', addArea)
router.get('/Areas/areaList', listAreas)
router.get('/Areas/editArea/:id', editArea)
router.post('/Areas/addAreas', postAddArea)
router.post('/Areas/editArea/', postEditArea)


// Customers
router.get('/Customers/customer', customersList)
router.get('/Customers/viewCustomer', viewCustomer)
router.get('/Customers/editMembership', editMembership)

// Hotels Clients
router.get('/Hotels/addHotel', hotelClients)
router.get('/Hotels/hotelsList', hotelList)
router.get('/Hotels/viewHotel/:id', viewHotel)
router.get('/Hotels/editHotel/:id', editHotel)
router.get('/Hotels/approvedHotels', hotelApproved)
router.get('/Hotels/unapprovedHotels', hotelUnapproved)
router.get('/Hotels/addHotelGallery', addGalleryHotel)
router.get('/Hotels/addHotelImages', addHotelImages)
router.get('/Hotels/galleryList', galleryList)
router.get('/Hotels/viewHotelImages/:id', viewHotelImages)
router.post('/Hotels/addHotel', postAddHotel)
router.post('/Hotels/editHotel/', postEditHotel)
router.post('/Hotels/addHotelGallery', postAddHotelGallery)
router.post('/Hotels/DeleteGalleryImage', postDeleteGalleryImage)

// Appartments / Houses
router.get('/Appartments/addAppartment', appartmentsHouses)
router.get('/Appartments/appartmentHouseList', appartmentHouseList)
router.get('/Appartments/editAppartmentHouse', editAppartmentHouse)
router.get('/Appartments/addGalleryAppartments', addGalleryAppartment)
router.get('/Appartments/editGalleryAppartments', editGalleryAppartments)
router.get('/Appartments/appartmentList', appartmentList)
router.get('/Appartments/housesList', housesList)
router.get('/Appartments/addGalleryHouses', addGalleryHouses)
router.get('/Appartments/editGalleryHouses', editGalleryHouses)

// Rooms
router.get('/Rooms/addRoom', addRoom)
router.get('/Rooms/roomList', roomList)
router.get('/Rooms/editRoom', editRoom)
router.get('/Rooms/addRoomGallery', addRoomGallery)
router.get('/Rooms/editRoomGallery', editRoomGallery)

// Vehicle
router.get('/Vehicles/addVehicles', addVehicle)
router.get('/Vehicles/vehicleList', vehicleList)
router.get('/Vehicles/editVehicle', editVehicle)
router.get('/Vehicles/addVehicleGallery', addVehicleGallery)
router.get('/Vehicles/editVehicleGallery', editVehicleGallery)

// Updates / Blog
router.get('/Updates/addUpdates', addUpdates)
router.get('/Updates/updateList', updateList)
router.get('/Updates/editBlog', editBlog)
router.get('/Updates/deleteBlog', deleteBlog)

// Tours Plans & Hiking
router.get('/Tours/addTours', addTour)
router.get('/Tours/toursList', tourList)
router.get('/Tours/viewTour/:id', viewTour)
router.get('/Tours/editTour/:id', editTour)

router.post('/Tours/addTours', postAddTour)
router.post('/Tours/editTour/', postEditTour)

// Bundles and Offers
router.get('/BundleOffers/addBundle', addBundle)
router.get('/BundleOffers/bundlesList', bundleList)

// Slider Images
router.get('/SliderImages/addSliderImages', addImagesSlider)
router.get('/SliderImages/sliderImagesList', sliderImages)

// Feedback
router.get('/Feedback/customerFeedback', feedback)
router.get('/Feedback/viewFeedbackQuery', viewFeedbackQuery)

// Users
router.get('/Users/addUser', addUser)
router.get('/Users/usersList', userList)
router.get('/Users/editUser', editUser)

module.exports = {
    routes: router
}