const { render } = require('ejs');
const express = require('express');
const {
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
} = require('../controllers/homeController')
const router = express.Router();

router.get('/', indexView)
router.get('/pages/Areas/addAreas', addArea)
router.get('/pages/Areas/areaList', listAreas)
router.get('/pages/Customers/customer', customersList)
router.get('/pages/Hotels/addHotel', hotelClients)
router.get('/pages/Hotels/hotelsList', hotelList)
router.get('/pages/Hotels/approvedHotels', hotelApproved)
router.get('/pages/Hotels/unapprovedHotels', hotelUnapproved)
router.get('/pages/Hotels/addHotelGallery', addGalleryHotel)
router.get('/pages/Appartments/addAppartment', appartmentsHouses)
router.get('/pages/Appartments/appartmentApprovedList', appartmentsApproved)
router.get('/pages/Appartments/appartmentUnapprovedList', approvedappartmentsUnapproved)
router.get('/pages/Appartments/addGalleryAppartments', addGalleryAppartment)
router.get('/pages/Appartments/appartmentList', appartmentList)
router.get('/pages/Appartments/housesList', housesList)
router.get('/pages/Vehicles/addVehicles', addVehicle)
router.get('/pages/Vehicles/vehicleList', vehicleList)
router.get('/pages/CompanyInfo/aboutUs', aboutUs)
router.get('/pages/CompanyInfo/contactUs', contactUs)
router.get('/pages/Updates/addUpdates', addUpdates)
router.get('/pages/Updates/updateList', updateList)
router.get('/pages/Services/addServices', addServices)
router.get('/pages/Services/servicesList', servicesList)


module.exports = {
    routes: router
}