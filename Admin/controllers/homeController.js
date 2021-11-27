const Areas = require('../models/Area')
const Tours = require('../models/Tour')

// Login
const login = (req, res, next) => {
    res.render('./login')
}

// Dashboard
const indexView = (req, res, next) => {
    res.render('./pages/Home/home');
}

// Areas
const addArea = (req, res, next) => {
    res.render('./pages/Areas/addAreas');
}

const listAreas = (req, res, next) => {
    Areas.find()
    .then(areas => {
        res.render('./pages/Areas/areaList', {
            areas: areas,
            pageTitle: 'Areas List',
            path: '/Areas/area-list'
        });
    })
    .catch(err => console.log(err));
}

const editArea = (req, res, next) => {

    const areaId = req.params.id;
    Areas.findById(areaId)
        .then(area => {
            if (!area) {
                return res.redirect('/');
            }
            res.render('./pages/Areas/editArea', {
                pageTitle: 'Edit Area',
                path: '/admin/edit-area',
                area: area
            });
        })
        .catch(err => console.log(err));
}

const postAddArea = (req, res, next) => {
    const name = req.body.areaName;
    const area = new Areas({
        name: name
    });
    area
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Area');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};

const postEditArea = (req, res, next) => {
    const areaId = req.body.areaId;
    const updatedName = req.body.areaName;
    Areas.findById(areaId)
        .then(area => {
            area.name = updatedName;
            return area.save();
        })
        .then(result => {
            console.log('UPDATED Area!');
            res.redirect('/');
        })
        .catch(err => console.log(err));
};
  

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

const editRoom = (req, res, next) => {
    res.render('./pages/Rooms/editRoom')
}

const addRoomGallery = (req, res, next) => {
    res.render('./pages/Rooms/addRoomGallery')
}

const editRoomGallery = (req, res, next) => {
    res.render('./pages/Rooms/editRoomGallery')
}

// Vehicle
const addVehicle = (req, res, next) => {
    res.render('./pages/Vehicles/addVehicles')
}

const vehicleList = (req, res, next) => {
    res.render('./pages/Vehicles/vehicleList')
}


const editVehicle = (req, res, next) => {
    res.render('./pages/Vehicles/editVehicle')
}

const addVehicleGallery = (req, res, next) => {
    res.render('./pages/Vehicles/addVehicleGallery')
}

const editVehicleGallery = (req, res, next) => {
    res.render('./pages/Vehicles/editVehicleGallery')
}

// Updates / Blog
const addUpdates = (req, res, next) => {
    res.render('./pages/Updates/addUpdates')
}

const updateList = (req, res, next) => {
    res.render('./pages/Updates/updateList')
}

const editBlog = (req, res, next) => {
    res.render('./pages/Updates/editBlog')
}

const deleteBlog = (req, res, next) => {
    res.render('./pages/Updates/deleteBlog')
}

// Tours Plans & Hiking
const addTour = (req, res, next) => {
    res.render('./pages/Tours/addTours')
}
const tourList = (req, res, next) =>{
    Tours.find()
    .then(tours => {
        res.render('./pages/Tours/toursList', {
            tours: tours,
            pageTitle: 'Tours List',
            path: '/Tours/tour-list'
        });
    })
    .catch(err => console.log(err));
}
const viewTour = (req, res, next) => {
    res.render('./pages/Tours/viewTour')
}

const editTour = (req, res, next) => {
    res.render('./pages/Tours/editTour')
}

const postAddTour = (req, res)=>{

    const tourType = req.body.tourType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const fromPlace = req.body.fromPlace;
    const toPlace = req.body.toPlace;
    const days = req.body.days;
    const nights = req.body.nights;
    const availableSeats = req.body.seats;
    const chargesPerHead = req.body.charges;
    const description = req.body.desc;
   
    const tour = new Tours({
        tourType: tourType,
        startDate: startDate,
        endDate: endDate,
        fromPlace: fromPlace,
        toPlace: toPlace,
        days: days,
        nights: nights,
        availableSeats: availableSeats,
        chargesPerHead: chargesPerHead,
        description: description
    });
    tour
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Tour');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
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

const viewFeedbackQuery = (req, res, next) => {
    res.render('./pages/Feedback/viewFeedbackQuery')
}

// Users
const addUser = (req, res, next) => {
    res.render('./pages/Users/addUser')
}

const userList = (req, res, next) => {
    res.render('./pages/Users/usersList')
}

const editUser = (req, res, next) => {
    res.render('./pages/Users/editUser')
}


module.exports = {
    // Login
    login,

    // Dashboard
    indexView,

    // Areas
    addArea, listAreas, editArea, postAddArea, postEditArea,

    // Customers
    customersList, viewCustomer, editMembership,
    
    // Hotels Clients
    hotelClients, hotelList, viewHotel, editHotel, hotelApproved, hotelUnapproved, addGalleryHotel, addHotelImages, galleryList, viewHotelImages,
    
    // Appartments / Houses 
    appartmentsHouses, appartmentHouseList, editAppartmentHouse, appartmentList, editGalleryAppartments, housesList, addGalleryAppartment, addGalleryHouses, editGalleryHouses,
    
    // Rooms
    addRoom, roomList, editRoom, addRoomGallery, editRoomGallery,

    // Vehicle
    addVehicle, vehicleList, editVehicle, addVehicleGallery, editVehicleGallery,

    // Updates / Blog
    addUpdates, updateList, editBlog, deleteBlog,
   
    // Tours Plans & Hiking
    addTour, tourList, viewTour, editTour, postAddTour,
    
    // Bundles and Offers
    addBundle, bundleList,

    // Slider Images
    addImagesSlider, sliderImages,

    // Customer Feedback
    feedback, viewFeedbackQuery,

    // Users
    addUser, userList, editUser

}