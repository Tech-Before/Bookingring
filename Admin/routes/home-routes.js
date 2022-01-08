const { render } = require('ejs');
const express = require('express');
const Hotels = require('../models/Hotel');
const {
    // Login
    login, postLogin, logout,

    // Dashboard
    indexView,

    // Areas
    addArea, listAreas, editArea, postAddArea, postEditArea, postDeleteArea,

    // Customers
    customersList, viewCustomer, editMembership,

    // Hotels Clients
    hotelClients, hotelList, viewHotel, editHotel, hotelApproved, hotelUnapproved, addGalleryHotel, addHotelImages, galleryList, viewHotelImages, postAddHotel, postEditHotel, postAddHotelGallery, postDeleteGalleryImage, postDeleteHotel,

    // Appartments / Houses 
    appartmentsHouses, appartmentHouseList, editAppartmentHouse, appartmentList, editGalleryAppartments, housesList, addGallery, addGalleryHouses, editGalleryHouses, postAddAppartment, postEditAppartment, postAddAppartmentGallery, postDeleteAppartmentGalleryImage, postDeleteAppartment,

    // Rooms
    addRoom, roomList, editRoom, addRoomGallery, editRoomGallery, postAddRoom, postEditRoom, postAddRoomGallery, postDeleteRoomGalleryImage, postDeleteRoom,

    // Vehicle Category
    addCategory, categoryList, editCategory, postAddVehicleCategory, postEditVehicleCategory,

    // Vehicle
    addVehicle, vehicleList, editVehicle, addVehicleGallery, editVehicleGallery, postAddVehicle, postEditVehicle, postAddVehicleGallery, postDeleteVehiclesGalleryImage, postDeleteVehicle,

    // Updates / Blog
    addUpdates, updateList, editBlog, deleteBlog, postAddUpdate, postEditUpdate, postDeleteUpdate,

    // Tours Plans & Hiking
    addTour, tourList, viewTour, editTour, postAddTour, postEditTour, postDeleteTour,

    // Bundles and Offers
    addBundle, bundleList,

    // Slider Images
    addImagesSlider, sliderImages, postAddSliderImages, postDeleteSliderGalleryImage,

    // Customer Feedback
    feedback, viewFeedbackQuery,

    // Users
    addUser, userList, editUser, postAddUser, postEditUser, postDeleteUser

} = require('../controllers/homeController')
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { check, body } = require('express-validator');

// Login
router.get('/login', login);
router.post('/postLogin', [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .trim()
  ], postLogin);
router.get('/logout', logout);

// Dashboard
router.get('/', isAuth, indexView)

// Areas
router.get('/Areas/addAreas', isAuth, addArea)
router.get('/Areas/areaList', isAuth, listAreas)
router.get('/Areas/editArea/:id', isAuth, editArea)
router.post('/Areas/addAreas', isAuth, postAddArea)
router.post('/Areas/editArea/', isAuth, postEditArea)
router.post('/Areas/deleteArea', isAuth, postDeleteArea)


// Customers
router.get('/Customers/customer', isAuth, customersList)
router.get('/Customers/viewCustomer', isAuth, viewCustomer)
router.get('/Customers/editMembership', isAuth, editMembership)

// Hotels Clients
router.get('/Hotels/addHotel', isAuth, hotelClients)
router.get('/Hotels/hotelsList', isAuth, hotelList)
router.get('/Hotels/viewHotel/:id', isAuth, viewHotel)
router.get('/Hotels/editHotel/:id', isAuth, editHotel)
router.get('/Hotels/approvedHotels', isAuth, hotelApproved)
router.get('/Hotels/unapprovedHotels', isAuth, hotelUnapproved)
router.get('/Hotels/addHotelGallery', isAuth, addGalleryHotel)
router.get('/Hotels/addHotelImages', isAuth, addHotelImages)
router.get('/Hotels/galleryList', isAuth, galleryList)
router.get('/Hotels/viewHotelImages/:id', isAuth, viewHotelImages)
router.post('/Hotels/addHotel', [
    check('loginEmail')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return Hotels.findOne({ loginEmail: value }).then(userHotel => {
          if (userHotel) {
            return Promise.reject(
              'Hotel associated with E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'loginPassword',
      'Please enter a password with only numbers and text and at least 8 characters.'
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body(
        'contact',
        'Please enter valid Hotel contact number.'
    )
    .isLength({ min: 10, max: 11})
    .trim(),
    body(
      'ownerCNIC',
      'Please enter valid 13-digit CNIC Number.'
    )
    .isLength({ min: 13, max: 13 })
    .trim(),
    body(
      'ownerContact',
      'Please enter valid owner contact Number.'
    )
    .isLength({ min: 10, max: 11 })
    .trim()
  ], isAuth, postAddHotel)

router.post('/Hotels/editHotel/',[
  check('loginEmail')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body(
    'loginPassword',
    'Please enter a password with only numbers and text and at least 8 characters.'
  )
    .isLength({ min: 8 }),
  body(
      'contact',
      'Please enter valid Hotel contact number.'
  )
  .isLength({ min: 10, max: 11})
  .trim(),
  body(
    'ownerCNIC',
    'Please enter valid 13-digit CNIC Number.'
  )
  .isLength({ min: 13, max: 13 })
  .trim(),
  body(
    'ownerContact',
    'Please enter valid owner contact Number.'
  )
  .isLength({ min: 10, max: 11 })
  .trim()
], isAuth, postEditHotel)
router.post('/Hotels/addHotelGallery', isAuth, postAddHotelGallery)
router.post('/Hotels/DeleteGalleryImage', postDeleteGalleryImage)
router.post('/Hotels/deleteHotel', isAuth, postDeleteHotel)

// Appartments / Houses
router.get('/Appartments/addAppartment', isAuth, appartmentsHouses)
router.get('/Appartments/appartmentHouseList', isAuth, appartmentHouseList)
router.get('/Appartments/editAppartmentHouse/:id', isAuth, editAppartmentHouse)
router.get('/Appartments/addGallery/:id', isAuth, addGallery)
router.get('/Appartments/editGallery/:id', isAuth, editGalleryAppartments)
router.get('/Appartments/appartmentList', isAuth, appartmentList)
router.get('/Appartments/housesList', isAuth, housesList)
router.get('/Appartments/addGalleryHouses', isAuth, addGalleryHouses)
router.get('/Appartments/editGalleryHouses', isAuth, editGalleryHouses)
// post requests routes for appartment
router.post('/Appartments/addAppartment', [
  check('loginEmail')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return Hotels.findOne({ loginEmail: value }).then(userHotel => {
        if (userHotel) {
          return Promise.reject(
            'Appartment associated with E-Mail exists already, please pick a different one.'
          );
        }
      });
    })
    .normalizeEmail(),
  body(
    'loginPassword',
    'Please enter a password with only numbers and text and at least 8 characters.'
  )
    .isLength({ min: 8 })
    .isAlphanumeric()
    .trim(),
  body(
      'contact',
      'Please enter valid Appartment contact number.'
  )
  .isLength({ min: 10, max: 11})
  .trim(),
  body(
    'ownerCNIC',
    'Please enter valid 13-digit CNIC Number without dashes.'
  )
  .isLength({ min: 13, max: 13 })
  .trim(),
  body(
    'ownerContact',
    'Please enter valid owner contact Number.'
  )
  .isLength({ min: 10, max: 11 })
  .trim()
], isAuth, postAddAppartment)

router.post('/Appartments/editAppartmentHouse',[
  check('loginEmail')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body(
    'loginPassword',
    'Please enter a password with only numbers and text and at least 8 characters.'
  )
    .isLength({ min: 8 }),
  body(
      'contact',
      'Please enter valid Appartment contact number.'
  )
  .isLength({ min: 10, max: 11})
  .trim(),
  body(
    'ownerCNIC',
    'Please enter valid 13-digit CNIC Number without dashes.'
  )
  .isLength({ min: 13, max: 13 })
  .trim(),
  body(
    'ownerContact',
    'Please enter valid owner contact Number.'
  )
  .isLength({ min: 10, max: 11 })
  .trim()
], isAuth, postEditAppartment)
router.post('/Appartments/addGallery', isAuth, postAddAppartmentGallery)
router.post('/Appartments/deleteGalleryImage', isAuth, postDeleteAppartmentGalleryImage)
router.post('/Appartments/deleteAppartment', isAuth, postDeleteAppartment)


// Rooms
router.get('/Rooms/addRoom', isAuth, addRoom)
router.get('/Rooms/roomList', isAuth, roomList)
router.get('/Rooms/editRoom/:id', isAuth, editRoom)
router.get('/Rooms/addGallery/:id', isAuth, addRoomGallery)
router.get('/Rooms/editGallery/:id', isAuth, editRoomGallery)
router.post('/Rooms/addRoom', isAuth, postAddRoom)
router.post('/Rooms/editRoom', isAuth, postEditRoom)
router.post('/Rooms/deleteRoom', isAuth, postDeleteRoom)
router.post('/Rooms/addGallery', isAuth, postAddRoomGallery)
router.post('/Rooms/deleteImage/', isAuth, postDeleteRoomGalleryImage)

// Vehicle Category
router.get('/VehiclesCategory/addCategory', isAuth, addCategory)
router.get('/VehiclesCategory/categoryList', isAuth, categoryList)
router.get('/VehiclesCategory/editCategory/:id', isAuth, editCategory)
router.post('/VehiclesCategory/addCategory', isAuth, postAddVehicleCategory)
router.post('/VehiclesCategory/editCategory', isAuth, postEditVehicleCategory)

// Vehicle
router.get('/Vehicles/addVehicles', isAuth, addVehicle)
router.get('/Vehicles/vehicleList', isAuth, vehicleList)
router.get('/Vehicles/editVehicle/:id', isAuth, editVehicle)
router.get('/Vehicles/addVehicleGallery/:id', isAuth, addVehicleGallery)
router.get('/Vehicles/editVehicleGallery/:id', isAuth, editVehicleGallery)
// post request routes for vehicles
router.post('/Vehicles/addVehicle',[
  body(
    'ownerCNIC',
    'Please enter valid 13-digit CNIC Number without dashes.'
  )
  .isLength({ min: 13, max: 13 })
  .trim(),
  body(
    'ownerContact',
    'Please enter valid owner contact Number.'
  )
  .isLength({ min: 10, max: 11 })
  .trim()
], isAuth, postAddVehicle)
router.post('/Vehicles/editVehicle',[
  body(
    'ownerCNIC',
    'Please enter valid 13-digit CNIC Number without dashes.'
  )
  .isLength({ min: 13, max: 13 })
  .trim(),
  body(
    'ownerContact',
    'Please enter valid owner contact Number.'
  )
  .isLength({ min: 10, max: 11 })
  .trim()
], isAuth, postEditVehicle)
router.post('/Vehicles/addGallery', isAuth, postAddVehicleGallery)
router.post('/Vehicles/deleteImage', isAuth, postDeleteVehiclesGalleryImage)
router.post('/Vehicles/deleteVehicle', isAuth, postDeleteVehicle)

// Updates / Blog
router.get('/Updates/addUpdates', isAuth, addUpdates)
router.get('/Updates/updateList', isAuth, updateList)
router.get('/Updates/editUpdate/:id', isAuth, editBlog)
router.get('/Updates/deleteBlog', isAuth, deleteBlog)
router.post('/Updates/addUpdate', isAuth, postAddUpdate)
router.post('/Updates/editUpdate', isAuth, postEditUpdate)
router.post('/Updates/deleteUpdate', isAuth, postDeleteUpdate)

// Tours Plans & Hiking
router.get('/Tours/addTours', isAuth, addTour)
router.get('/Tours/toursList', isAuth, tourList)
router.get('/Tours/viewTour/:id', isAuth, viewTour)
router.get('/Tours/editTour/:id', isAuth, editTour)
router.post('/Tours/deleteTour', isAuth, postDeleteTour)

router.post('/Tours/addTours', isAuth, postAddTour)
router.post('/Tours/editTour/', isAuth, postEditTour)

// Bundles and Offers
router.get('/BundleOffers/addBundle', isAuth, addBundle)
router.get('/BundleOffers/bundlesList', isAuth, bundleList)

// Slider Images
router.get('/SliderImages/addSliderImages/:id', isAuth, addImagesSlider)
router.get('/SliderImages/sliderImagesList', isAuth, sliderImages)
router.post('/SliderImages/addImages', isAuth, postAddSliderImages)
router.post('/SliderGallery/deleteImage', isAuth, postDeleteSliderGalleryImage)

// Feedback
router.get('/Feedback/customerFeedback', isAuth, feedback)
router.get('/Feedback/viewFeedbackQuery', isAuth, viewFeedbackQuery)

// Users
router.get('/Users/addUser', isAuth, addUser)
router.get('/Users/usersList', isAuth, userList)
router.get('/Users/editUser/:id', isAuth, editUser)
router.post('/Users/addUser', isAuth, postAddUser)
router.post('/Users/editUser', isAuth, postEditUser)
router.post('/Users/deleteUser', isAuth, postDeleteUser)

module.exports = {
    routes: router
}