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
    appartmentsHouses, appartmentHouseList, editAppartmentHouse, appartmentList, editGalleryAppartments, housesList, addGallery, addGalleryHouses, editGalleryHouses, postAddAppartment, postEditAppartment, postAddAppartmentGallery, postDeleteAppartmentGalleryImage,
    
    // Rooms
    addRoom, roomList, editRoom, addRoomGallery, editRoomGallery, postAddRoom, postEditRoom, postAddRoomGallery, postDeleteRoomGalleryImage,

    // Vehicle
    addVehicle, vehicleList, editVehicle, addVehicleGallery, editVehicleGallery, postAddVehicle, postEditVehicle, postAddVehicleGallery, postDeleteVehiclesGalleryImage,

    // Updates / Blog
    addUpdates, updateList, editBlog, deleteBlog,
    
    // Tours Plans & Hiking
    addTour, tourList, viewTour, editTour, postAddTour, postEditTour,
    
    // Bundles and Offers
    addBundle, bundleList,

    // Slider Images
    addImagesSlider, sliderImages, postAddSliderImages, postDeleteSliderGalleryImage,

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
router.get('/Appartments/editAppartmentHouse/:id', editAppartmentHouse)
router.get('/Appartments/addGallery/:id', addGallery)
router.get('/Appartments/editGallery/:id', editGalleryAppartments)
router.get('/Appartments/appartmentList', appartmentList)
router.get('/Appartments/housesList', housesList)
router.get('/Appartments/addGalleryHouses', addGalleryHouses)
router.get('/Appartments/editGalleryHouses', editGalleryHouses)
router.post('/Appartments/addAppartment', postAddAppartment)
router.post('/Appartments/editAppartmentHouse', postEditAppartment)
router.post('/Appartments/addGallery', postAddAppartmentGallery)
router.post('/Appartments/deleteGalleryImage', postDeleteAppartmentGalleryImage)


// Rooms
router.get('/Rooms/addRoom', addRoom)
router.get('/Rooms/roomList', roomList)
router.get('/Rooms/editRoom/:id', editRoom)
router.get('/Rooms/addGallery/:id', addRoomGallery)
router.get('/Rooms/editGallery/:id', editRoomGallery)
router.post('/Rooms/addRoom', postAddRoom)
router.post('/Rooms/editRoom', postEditRoom)
router.post('/Rooms/addGallery', postAddRoomGallery)
router.post('/Rooms/deleteImage/', postDeleteRoomGalleryImage)



// Vehicle
router.get('/Vehicles/addVehicles', addVehicle)
router.get('/Vehicles/vehicleList', vehicleList)
router.get('/Vehicles/editVehicle/:id', editVehicle)
router.get('/Vehicles/addVehicleGallery/:id', addVehicleGallery)
router.get('/Vehicles/editVehicleGallery/:id', editVehicleGallery)
router.post('/Vehicles/addVehicle', postAddVehicle)
router.post('/Vehicles/editVehicle', postEditVehicle)
router.post('/Vehicles/addGallery', postAddVehicleGallery)
router.post('/Vehicles/deleteImage', postDeleteVehiclesGalleryImage)

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
router.get('/SliderImages/addSliderImages/:id', addImagesSlider)
router.get('/SliderImages/sliderImagesList', sliderImages)
router.post('/SliderImages/addImages', postAddSliderImages)
router.post('/SliderGallery/deleteImage', postDeleteSliderGalleryImage)

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