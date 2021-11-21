const { render } = require('ejs');
const express = require('express');
const {
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
    addRoom, roomList, editRoom, addRoomGallery, editRoomGallery,

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

} = require('../controllers/homeController')
const router = express.Router();

// Dashboard
router.get('/', indexView)

// Areas
router.get('/pages/Areas/addAreas', addArea)
router.get('/pages/Areas/areaList', listAreas)
router.get('/pages/Areas/editArea', editArea)

// Customers
router.get('/pages/Customers/customer', customersList)
router.get('/pages/Customers/viewCustomer', viewCustomer)
router.get('/pages/Customers/editMembership', editMembership)

// Hotels Clients
router.get('/pages/Hotels/addHotel', hotelClients)
router.get('/pages/Hotels/hotelsList', hotelList)
router.get('/pages/Hotels/viewHotel', viewHotel)
router.get('/pages/Hotels/editHotel', editHotel)
router.get('/pages/Hotels/approvedHotels', hotelApproved)
router.get('/pages/Hotels/unapprovedHotels', hotelUnapproved)
router.get('/pages/Hotels/addHotelGallery', addGalleryHotel)
router.get('/pages/Hotels/addHotelImages', addHotelImages)
router.get('/pages/Hotels/galleryList', galleryList)
router.get('/pages/Hotels/viewHotelImages', viewHotelImages)

// Appartments / Houses
router.get('/pages/Appartments/addAppartment', appartmentsHouses)
router.get('/pages/Appartments/appartmentHouseList', appartmentHouseList)
router.get('/pages/Appartments/editAppartmentHouse', editAppartmentHouse)
router.get('/pages/Appartments/addGalleryAppartments', addGalleryAppartment)
router.get('/pages/Appartments/editGalleryAppartments', editGalleryAppartments)
router.get('/pages/Appartments/appartmentList', appartmentList)
router.get('/pages/Appartments/housesList', housesList)
router.get('/pages/Appartments/addGalleryHouses', addGalleryHouses)
router.get('/pages/Appartments/editGalleryHouses', editGalleryHouses)

// Rooms
router.get('/pages/Rooms/addRoom', addRoom)
router.get('/pages/Rooms/roomList', roomList)
router.get('/pages/Rooms/editRoom', editRoom)
router.get('/pages/Rooms/addRoomGallery', addRoomGallery)
router.get('/pages/Rooms/editRoomGallery', editRoomGallery)

// Vehicle
router.get('/pages/Vehicles/addVehicles', addVehicle)
router.get('/pages/Vehicles/vehicleList', vehicleList)

// Company Info
router.get('/pages/CompanyInfo/aboutUs', aboutUs)
router.get('/pages/CompanyInfo/contactUs', contactUs)

// Updates / Blog
router.get('/pages/Updates/addUpdates', addUpdates)
router.get('/pages/Updates/updateList', updateList)

// Services
router.get('/pages/Services/addServices', addServices)
router.get('/pages/Services/servicesList', servicesList)

// Tours Plans & Hiking
router.get('/pages/Tours/addTours', addTour)
router.get('/pages/Tours/toursList', tourList)

// Bundles and Offers
router.get('/pages/BundleOffers/addBundle', addBundle)
router.get('/pages/BundleOffers/bundlesList', bundleList)

// Slider Images
router.get('/pages/SliderImages/addSliderImages', addImagesSlider)
router.get('/pages/SliderImages/sliderImagesList', sliderImages)
router.get('/pages/Feedback/customerFeedback', feedback)

// Users
router.get('/pages/Users/addUser', addUser)
router.get('/pages/Users/usersList', userList)



module.exports = {
    routes: router
}