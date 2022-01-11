const { render } = require("ejs");
const express = require("express");
const Hotels = require("../models/Hotel");
const {
  // Login
  login,
  postLogin,
  logout,

  // Dashboard
  indexView,

  // Areas
  addArea,
  listAreas,
  editArea,
  postAddArea,
  postEditArea,
  postDeleteArea,

  // Customers
  customersList,
  viewCustomer,
  editMembership,

  // Hotels Clients
  hotelClients,
  hotelList,
  viewHotel,
  editHotel,
  hotelApproved,
  hotelUnapproved,
  addGalleryHotel,
  addHotelImages,
  galleryList,
  viewHotelImages,
  postAddHotel,
  postEditHotel,
  postAddHotelGallery,
  postDeleteGalleryImage,
  postDeleteHotel,

  // Appartments / Houses
  appartmentsHouses,
  appartmentHouseList,
  editAppartmentHouse,
  appartmentList,
  editGalleryAppartments,
  housesList,
  addGallery,
  addGalleryHouses,
  editGalleryHouses,
  postAddAppartment,
  postEditAppartment,
  postAddAppartmentGallery,
  postDeleteAppartmentGalleryImage,
  postDeleteAppartment,

  // Rooms
  addRoom,
  roomList,
  editRoom,
  addRoomGallery,
  editRoomGallery,
  postAddRoom,
  postEditRoom,
  postAddRoomGallery,
  postDeleteRoomGalleryImage,
  postDeleteRoom,

  // Vehicle Category
  addCategory,
  categoryList,
  editCategory,
  postAddVehicleCategory,
  postEditVehicleCategory,

  // Vehicle
  addVehicle,
  vehicleList,
  editVehicle,
  addVehicleGallery,
  editVehicleGallery,
  postAddVehicle,
  postEditVehicle,
  postAddVehicleGallery,
  postDeleteVehiclesGalleryImage,
  postDeleteVehicle,

  // Updates / Blog
  addUpdates,
  updateList,
  editBlog,
  deleteBlog,
  postAddUpdate,
  postEditUpdate,
  postDeleteUpdate,

  // Tours Plans & Hiking
  addTour,
  tourList,
  viewTour,
  editTour,
  postAddTour,
  postEditTour,
  postDeleteTour,

  // Bundles and Offers
  addBundle,
  bundleList,

  // Slider Images
  addImagesSlider,
  sliderImages,
  postAddSliderImages,
  postDeleteSliderGalleryImage,

  // Customer Feedback
  feedback,
  viewFeedbackQuery,

  // Users
  addUser,
  userList,
  editUser,
  postAddUser,
  postEditUser,
  postDeleteUser,
} = require("../controllers/homeController");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const { body } = require("express-validator");

// Login
router.get("/login", login);
router.post(
  "/postLogin",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail()
      .trim(),
    body("password", "Password has to be valid.").trim(),
  ],
  postLogin
);
router.get("/logout", logout);

// Dashboard
router.get("/", isAuth, indexView);

// Areas
router.get("/Areas/addAreas", isAuth, addArea);
router.get("/Areas/areaList", isAuth, listAreas);
router.get("/Areas/editArea/:id", isAuth, editArea);
router.post(
  "/Areas/addAreas",
  body("areaName", "Please enter valid Location.")
    .notEmpty()
    .custom((val) => {
      console.log(val.trim().length)
      if (val.trim().length === 0) {
        throw new Error();
      }else{
        return true;
      }
    })
    .isLength({ min: 3, max: 25 })
    .trim()
    .escape(),
  isAuth,
  postAddArea
);
router.post(
  "/Areas/editArea/",
  body("areaName", "Please enter valid Location.")
    .notEmpty()
    .custom((val) => {
      console.log(val.trim().length)
      if (val.trim().length === 0) {
        throw new Error();
      }else{
        return true;
      }
    })
    .isLength({ min: 3, max: 25 })
    .trim()
    .escape(),
  isAuth,
  postEditArea
);
router.post("/Areas/deleteArea", isAuth, postDeleteArea);

// Customers
router.get("/Customers/customer", isAuth, customersList);
router.get("/Customers/viewCustomer", isAuth, viewCustomer);
router.get("/Customers/editMembership", isAuth, editMembership);

// Hotels Clients
router.get("/Hotels/addHotel", isAuth, hotelClients);
router.get("/Hotels/hotelsList", isAuth, hotelList);
router.get("/Hotels/viewHotel/:id", isAuth, viewHotel);
router.get("/Hotels/editHotel/:id", isAuth, editHotel);
router.get("/Hotels/approvedHotels", isAuth, hotelApproved);
router.get("/Hotels/unapprovedHotels", isAuth, hotelUnapproved);
router.get("/Hotels/addHotelGallery", isAuth, addGalleryHotel);
router.get("/Hotels/addHotelImages", isAuth, addHotelImages);
router.get("/Hotels/galleryList", isAuth, galleryList);
router.get("/Hotels/viewHotelImages/:id", isAuth, viewHotelImages);
router.post(
  "/Hotels/addHotel",
  [
    body("hotelName", "Please enter valid Hotel Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 200 })
      .trim()
      .escape(),
    body("contact", "Please enter valid Hotel contact number.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 10, max: 11 })
      .trim(),
    body("parking", "Please enter valid value for parking.").isBoolean(),
    body("area", "Please enter valid Hotel Location.")
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .trim()
      .escape(),
    body(
      "roomService",
      "Please enter valid value for room Service."
    ).isBoolean(),
    body("address", "Please enter valid Hotel Address.")
      .notEmpty()
      .isLength({ min: 5, max: 200 })
      .trim()
      .escape(),
    body("ownerName", "Please enter valid Owner Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 100 })
      .trim()
      .escape(),
    body("ownerCNIC", "Please enter valid 13-digit CNIC Number.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 13, max: 13 })
      .trim(),
    body("ownerContact", "Please enter valid owner contact Number.")
      .notEmpty()
      .isNumeric()
      .isLength({ min: 10, max: 11 })
      .trim(),
    body("loginEmail")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Hotels.findOne({ loginEmail: value }).then((userHotel) => {
          if (userHotel) {
            return Promise.reject(
              "Hotel associated with E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail()
      .toLowerCase(),
    body(
      "loginPassword",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
      .notEmpty()
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  isAuth,
  postAddHotel
);

router.post(
  "/Hotels/editHotel/",
  [
    body("hotelName", "Please enter valid Hotel Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        }else{
          return true;
        }
      })
      .isLength({ min: 3, max: 100 })
      .trim()
      .escape(),
    body("contact", "Please enter valid Hotel contact number.")
      .isLength({ min: 10, max: 11 })
      .isNumeric()
      .trim(),
    body("parking", "Please enter valid value for parking.").isBoolean(),
    body("area", "Please enter valid Hotel Location.")
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .trim()
      .escape(),
    body(
      "roomServices",
      "Please enter valid value for room Service."
    ).isBoolean(),
    body("address", "Please enter valid Hotel Address.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        }else{
          return true;
        }
      })
      .isLength({ min: 3, max: 200 })
      .trim()
      .escape(),
    body("ownerName", "Please enter valid Owner Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        }else{
          return true;
        }
      })
      .isLength({ min: 3, max: 100 })
      .trim()
      .escape(),
    body("ownerCNIC", "Please enter valid 13-digit CNIC Number.")
      .isLength({ min: 13, max: 13 })
      .trim(),
    body("ownerContact", "Please enter valid owner contact Number.")
      .isLength({ min: 10, max: 11 })
      .isNumeric()
      .trim(),
    body("loginEmail")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .toLowerCase(),
    body(
      "loginPassword",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
    .custom(val =>{
      if(val.length> 0){
        return body("loginPassword")
          .notEmpty()
          .isLength({ min: 8 })
          .isAlphanumeric()
          .trim();
      }else{
        return true;
      }
    })
  ],
  isAuth,
  postEditHotel
);
router.post("/Hotels/addHotelGallery", isAuth, postAddHotelGallery);
router.post("/Hotels/DeleteGalleryImage", postDeleteGalleryImage);
router.post("/Hotels/deleteHotel", isAuth, postDeleteHotel);

// Appartments / Houses
router.get("/Appartments/addAppartment", isAuth, appartmentsHouses);
router.get("/Appartments/appartmentHouseList", isAuth, appartmentHouseList);
router.get("/Appartments/editAppartmentHouse/:id", isAuth, editAppartmentHouse);
router.get("/Appartments/addGallery/:id", isAuth, addGallery);
router.get("/Appartments/editGallery/:id", isAuth, editGalleryAppartments);
router.get("/Appartments/appartmentList", isAuth, appartmentList);
router.get("/Appartments/housesList", isAuth, housesList);
router.get("/Appartments/addGalleryHouses", isAuth, addGalleryHouses);
router.get("/Appartments/editGalleryHouses", isAuth, editGalleryHouses);
// post requests routes for appartment
router.post(
  "/Appartments/addAppartment",
  [
    body("appartName", "Please enter valid Appartment Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .trim()
      .escape(),
    body("price", "Please enter valid price.").isNumeric().trim(),
    body("contact", "Please enter valid Appartment Contact number.")
      .isLength({ min: 10, max: 11 })
      .isNumeric(),
    body("parking", "Please enter valid parking value.").isBoolean(),
    body("area", "Please enter valid location.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .escape(),
    body("appartType", "Please enter valid appartment type.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .trim()
      .escape(),
    body("address", "Please enter valid address.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 200 })
      .trim()
      .escape(),
    body("videoUrl", "Please enter valid URL.")
    .isURL(),
    body("description", "Please enter valid description")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .trim()
      .escape(),
    body("features", "Please enter valid features")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .trim()
      .escape(),
    body("ownerName", "Please enter valid Owner Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .trim()
      .escape(),
    body("ownerCNIC", "Please enter valid 13-digit CNIC Number.")
      .isLength({ min: 13, max: 13 })
      .trim(),
    body("ownerContact", "Please enter valid owner contact Number.")
      .isLength({ min: 10, max: 11 })
      .isNumeric()
      .trim(),
    body("loginEmail")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .toLowerCase(),
    body(
      "loginPassword",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
    .isLength({ min: 8 })
    .isAlphanumeric()
    .trim(),
  ],
  isAuth,
  postAddAppartment
);

router.post(
  "/Appartments/editAppartmentHouse",
  [
    body("appartName", "Please enter valid Appartment Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .trim()
      .escape(),
    body("price", "Please enter valid price.").isNumeric().trim(),
    body("contact", "Please enter valid Appartment Contact number.")
      .isLength({ min: 10, max: 11 })
      .isNumeric(),
    body("parking", "Please enter valid parking value.").isBoolean(),
    body("area", "Please enter valid location.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .escape(),
    body("appartType", "Please enter valid appartment type.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .trim()
      .escape(),
    body("address", "Please enter valid address.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 200 })
      .trim()
      .escape(),
    body("videoUrl", "Please enter valid URL.")
    .isURL(),
    body("description", "Please enter valid description")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .trim()
      .escape(),
    body("features", "Please enter valid features")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .trim()
      .escape(),
    body("ownerName", "Please enter valid Owner Name.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length === 0) {
          throw new Error();
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 50 })
      .trim()
      .escape(),
    body("ownerCNIC", "Please enter valid 13-digit CNIC Number.")
      .isLength({ min: 13, max: 13 })
      .trim(),
    body("ownerContact", "Please enter valid owner contact Number.")
      .isLength({ min: 10, max: 11 })
      .isNumeric()
      .trim(),
    body("loginEmail")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .toLowerCase(),
    body(
      "loginPassword",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
    .custom(val =>{
      if(val.length> 0){
        return body("loginPassword")
          .isLength({ min: 8 })
          .isAlphanumeric()
          .trim();
      }else{
        return true;
      }
    }),
  ],
  isAuth,
  postEditAppartment
);
router.post("/Appartments/addGallery", isAuth, postAddAppartmentGallery);
router.post(
  "/Appartments/deleteGalleryImage",
  isAuth,
  postDeleteAppartmentGalleryImage
);
router.post("/Appartments/deleteAppartment", isAuth, postDeleteAppartment);

// Rooms
router.get("/Rooms/addRoom", isAuth, addRoom);
router.get("/Rooms/roomList", isAuth, roomList);
router.get("/Rooms/editRoom/:id", isAuth, editRoom);
router.get("/Rooms/addGallery/:id", isAuth, addRoomGallery);
router.get("/Rooms/editGallery/:id", isAuth, editRoomGallery);
//post requests for rooms
router.post(
  "/Rooms/addRoom",
  [
    body("hotel", "invalid hotel input").notEmpty().trim(),
    body("area", "invalid area input").notEmpty().trim(),
    body("beds", "invalid beds input").isNumeric(),
    body("hotWater", "invalid Hot water input").isBoolean(),
    body("heater", "invalid heater input").isBoolean(),
    body("balcony", "invalid balcony input").isBoolean(),
    body("status", "invalid status input").isBoolean(),
    body("location", "Please enter valid location")
      .notEmpty()
      .custom((val) => {
        if (val.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .isLength({ min: 3, max: 200 })
      .trim()
      .escape(),
    body("charges", "Please enter valid charges")
      .notEmpty()
      .isLength({ min: 1 })
      .isNumeric()
      .trim(),
    body("roomNo", "Please valid Room No.")
      .isNumeric()
      .isLength({ min: 1 })
      .trim(),
    body("size", "Please enter valid size.")
      .notEmpty()
      .custom((val) => {
        if (val.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .notEmpty()
      .isLength({ min: 3 })
      .trim()
      .escape(),
    body("occupency", "Please valid occupency.")
      .notEmpty()
      .custom((val) => {
        if (val.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .isLength({ min: 1 })
      .trim()
      .escape(),
    body("bedSize", "invalid bed Size.").notEmpty(),
    body("videoUrl", "invalid video URL.").isURL(),
    body("description", "Please enter valid description.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length===0) {
          return false;
        } else {
          return true;
        }
      })
      .isLength({ min: 3 })
      .trim()
      .escape(),
    body("features", "Please enter valid description.")
      .notEmpty()
      .custom((val) => {
        if (val.trim().length===0) {
          return false;
        } else {
          return true;
        }
      })
      .isLength({ min: 3 })
      .trim()
      .escape(),
  ],
  isAuth,
  postAddRoom
);
router.post("/Rooms/editRoom",
[
  body("hotel", "invalid hotel input").notEmpty().trim(),
  body("area", "invalid area input").notEmpty().trim(),
  body("beds", "invalid beds input").isNumeric(),
  body("hotWater", "invalid Hot water input").isBoolean(),
  body("heater", "invalid heater input").isBoolean(),
  body("balcony", "invalid balcony input").isBoolean(),
  body("status", "invalid status input").isBoolean(),
  body("location", "Please enter valid location")
    .notEmpty()
    .custom((val) => {
      if (val.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .isLength({ min: 3, max: 200 })
    .trim()
    .escape(),
  body("charges", "Please enter valid charges")
    .notEmpty()
    .isLength({ min: 1 })
    .isNumeric()
    .trim(),
  body("roomNo", "Please valid Room No.")
    .isNumeric()
    .isLength({ min: 1 })
    .trim(),
  body("size", "Please enter valid size.")
    .notEmpty()
    .custom((val) => {
      if (val.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .notEmpty()
    .isLength({ min: 3 })
    .trim()
    .escape(),
  body("occupency", "Please valid occupency.")
    .notEmpty()
    .custom((val) => {
      if (val.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("bedSize", "invalid bed Size.").notEmpty(),
  body("videoUrl", "invalid video URL.").isURL(),
  body("description", "Please enter valid description.")
    .notEmpty()
    .custom((val) => {
      if (val.trim().length===0) {
        return false;
      } else {
        return true;
      }
    })
    .isLength({ min: 3 })
    .trim()
    .escape(),
  body("features", "Please enter valid description.")
    .notEmpty()
    .custom((val) => {
      if (val.trim().length===0) {
        return false;
      } else {
        return true;
      }
    })
    .isLength({ min: 3 })
    .trim()
    .escape(),
],
isAuth, postEditRoom);
router.post("/Rooms/deleteRoom", isAuth, postDeleteRoom);
router.post("/Rooms/addGallery", isAuth, postAddRoomGallery);
router.post("/Rooms/deleteImage/", isAuth, postDeleteRoomGalleryImage);

// Vehicle Category
router.get("/VehiclesCategory/addCategory", isAuth, addCategory);
router.get("/VehiclesCategory/categoryList", isAuth, categoryList);
router.get("/VehiclesCategory/editCategory/:id", isAuth, editCategory);
router.post("/VehiclesCategory/addCategory", isAuth, postAddVehicleCategory);
router.post("/VehiclesCategory/editCategory", isAuth, postEditVehicleCategory);

// Vehicle
router.get("/Vehicles/addVehicles", isAuth, addVehicle);
router.get("/Vehicles/vehicleList", isAuth, vehicleList);
router.get("/Vehicles/editVehicle/:id", isAuth, editVehicle);
router.get("/Vehicles/addVehicleGallery/:id", isAuth, addVehicleGallery);
router.get("/Vehicles/editVehicleGallery/:id", isAuth, editVehicleGallery);
// post request routes for vehicles
router.post(
  "/Vehicles/addVehicle",
  [
    body("ownerCNIC", "Please enter valid 13-digit CNIC Number without dashes.")
      .isLength({ min: 13, max: 13 })
      .trim(),
    body("ownerContact", "Please enter valid owner contact Number.")
      .isLength({ min: 10, max: 11 })
      .trim(),
  ],
  isAuth,
  postAddVehicle
);
router.post(
  "/Vehicles/editVehicle",
  [
    body("ownerCNIC", "Please enter valid 13-digit CNIC Number without dashes.")
      .isLength({ min: 13, max: 13 })
      .trim(),
    body("ownerContact", "Please enter valid owner contact Number.")
      .isLength({ min: 10, max: 11 })
      .trim(),
  ],
  isAuth,
  postEditVehicle
);
router.post("/Vehicles/addGallery", isAuth, postAddVehicleGallery);
router.post("/Vehicles/deleteImage", isAuth, postDeleteVehiclesGalleryImage);
router.post("/Vehicles/deleteVehicle", isAuth, postDeleteVehicle);

// Updates / Blog
router.get("/Updates/addUpdates", isAuth, addUpdates);
router.get("/Updates/updateList", isAuth, updateList);
router.get("/Updates/editUpdate/:id", isAuth, editBlog);
router.get("/Updates/deleteBlog", isAuth, deleteBlog);
router.post("/Updates/addUpdate", isAuth, postAddUpdate);
router.post("/Updates/editUpdate", isAuth, postEditUpdate);
router.post("/Updates/deleteUpdate", isAuth, postDeleteUpdate);

// Tours Plans & Hiking
router.get("/Tours/addTours", isAuth, addTour);
router.get("/Tours/toursList", isAuth, tourList);
router.get("/Tours/viewTour/:id", isAuth, viewTour);
router.get("/Tours/editTour/:id", isAuth, editTour);
router.post("/Tours/deleteTour", isAuth, postDeleteTour);

router.post("/Tours/addTours", isAuth, postAddTour);
router.post("/Tours/editTour/", isAuth, postEditTour);

// Bundles and Offers
router.get("/BundleOffers/addBundle", isAuth, addBundle);
router.get("/BundleOffers/bundlesList", isAuth, bundleList);

// Slider Images
router.get("/SliderImages/addSliderImages/:id", isAuth, addImagesSlider);
router.get("/SliderImages/sliderImagesList", isAuth, sliderImages);
router.post("/SliderImages/addImages", isAuth, postAddSliderImages);
router.post("/SliderGallery/deleteImage", isAuth, postDeleteSliderGalleryImage);

// Feedback
router.get("/Feedback/customerFeedback", isAuth, feedback);
router.get("/Feedback/viewFeedbackQuery", isAuth, viewFeedbackQuery);

// Users
router.get("/Users/addUser", isAuth, addUser);
router.get("/Users/usersList", isAuth, userList);
router.get("/Users/editUser/:id", isAuth, editUser);
router.post(
  "/Users/addUser",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Hotels.findOne({ loginEmail: value }).then((userHotel) => {
          if (userHotel) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body("contact", "Please enter valid contact number.")
      .isLength({ min: 10, max: 11 })
      .trim(),
    body("cnic", "Please enter valid 13-digit CNIC Number.")
      .isLength({ min: 13, max: 13 })
      .trim(),
  ],
  isAuth,
  postAddUser
);
router.post(
  "/Users/editUser",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Hotels.findOne({ loginEmail: value }).then((userHotel) => {
          if (userHotel) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
    .custom(val =>{
      if(val.length> 0){
        return body("password").isLength({ min: 8 }).isAlphanumeric();
      }else{
        return true;
      }
    }),
    body("contact", "Please enter valid contact number.")
      .isLength({ min: 10, max: 11 })
      .trim(),
    body("cnic", "Please enter valid 13-digit CNIC Number.")
      .isLength({ min: 13, max: 13 })
      .trim(),
  ],
  isAuth,
  postEditUser
);
router.post("/Users/deleteUser", isAuth, postDeleteUser);

module.exports = {
  routes: router,
};
