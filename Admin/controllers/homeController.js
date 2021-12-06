const delImage = require('../util/file')
const Areas = require('../models/Area')
const Tours = require('../models/Tour')
const Hotels = require('../models/Hotel')
const hotelGallery = require('../models/hotelGallery')

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
    Areas.find()
    .then(areas => {
        res.render('./pages/Hotels/addHotel', {
            areas: areas,
            pageTitle: 'add hotel',
            path: '/Hotels/add-hotel'
        });
    })
    .catch(err => console.log(err));
}


const hotelList = (req, res, next) => {
    Hotels.find()
    .then(hotels => {
        res.render('./pages/Hotels/hotelsList', {
            hotels: hotels,
            pageTitle: 'Hotels List',
            path: '/Hotels/hotels-list'
        });
    })
    .catch(err => console.log(err));
}

const viewHotel = (req, res, next) => {
    const hotelId = req.params.id;
    Hotels.findById(hotelId)
        .then(hotel => {
            res.render('./pages/Hotels/viewHotel', {
                hotel: hotel,
                pageTitle: 'Hotels List',
                path: '/Hotels/hotel-view'
            });
        })
        .catch(err => console.log(err));
}

const editHotel = (req, res, next) => {

    const hotelId = req.params.id;
    Hotels.findById(hotelId)
        .then(hotel => {
            if (!hotel) {
                return res.redirect('/');
            }
            return Areas.find().then( areas => {
                return { hotel: hotel, areas: areas }
            })
        }).
        then( data => {
            res.render('./pages/Hotels/editHotel', {
                pageTitle: 'Edit Tour',
                path: '/admin/edit-tour',
                data: data
            });
        })
        .catch(err => console.log(err));

}

const hotelApproved = (req, res, next) => {
    Hotels.find({approvedStatus: true})
    .then(hotels => {
        if (!hotels) {
            redirect('/')
        }
        res.render('./pages/Hotels/approvedHotels', {
            hotels: hotels,
            pageTitle: 'Approved Hotels',
            path: '/Hotels/approved-hotels'
        });
    })
    .catch(err => console.log(err));
}

const hotelUnapproved = (req, res, next) => {
    Hotels.find({approvedStatus: false})
    .then(hotels => {
        if (!hotels) {
            redirect('/')
        }
        res.render('./pages/Hotels/unapprovedHotels', {
            hotels: hotels,
            pageTitle: 'Approved Hotels',
            path: '/Hotels/approved-hotels'
        });
    })
    .catch(err => console.log(err));
}

const addGalleryHotel = (req, res, next) => {

    Hotels.find()
    .then(hotels => {
        if(!hotels){
            res.redirect('/')
        }
        res.render('./pages/Hotels/addHotelGallery', {
            hotels: hotels,
            pageTitle: 'Add Gallery',
            path: '/Hotels/add-gallery'
        });
    })
    .catch(err => console.log(err));

}

const addHotelImages = (req, res, next) => {
    const hotelId = req.query.hotelId;
    res.render('./pages/Hotels/addHotelImages', {hotelId: hotelId})
}

const galleryList = (req, res, next) => {

    hotelGallery.find()
    .populate('hotelId')
    .then(galleries => {
        if(!galleries){
            res.redirect('/')
        }
        res.render('./pages/Hotels/galleryList', {
            galleries: galleries,
            pageTitle: 'Gallery List',
            path: '/Hotels/gallery-list'
        });
    })
    .catch(err => console.log(err));

}

const viewHotelImages = (req, res, next) => {

    const hotelId = req.params.id;
    hotelGallery.findOne({hotelId: hotelId})
    .then(gallery => {
        if(!gallery){
            res.redirect('/')
        }
        res.render('./pages/Hotels/viewHotelImages', {
            gallery: gallery,
            pageTitle: 'Gallery List',
            path: '/Hotels/gallery-list'
        });
    })
    .catch(err => console.log(err));
}

const postAddHotel = (req, res, next) => {
    const name = req.body.hotelName;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    // const approvedStatus = req.body.status;
    const hotel = new Hotels({
        hotelName: name,
        contact: contact,
        parking: parking,
        area: area,
        address: address,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        loginEmail: loginEmail,
        loginPassword: loginPassword,
        approvedStatus: false
    });
    hotel
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Hotel');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};

const postEditHotel = (req, res, next)=>{

    const hotelId = req.body.hotelId;
    const name = req.body.hotelName;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    const approvedStatus = req.body.status;

    Hotels.findById(hotelId)
        .then(hotel => {
            hotel.hotelName = name,
            hotel.contact = contact,
            hotel.parking = parking,
            hotel.area = area,
            hotel.address = address,
            hotel.ownerName = ownerName,
            hotel.ownerCNIC = ownerCNIC,
            hotel.ownerContact = ownerContact,
            hotel.loginEmail = loginEmail,
            hotel.loginPassword = loginPassword,
            hotel.approvedStatus = approvedStatus
            return hotel.save();
        })
        .then(result => {
            console.log('UPDATED Hotel!');
            res.redirect('/');
        })
        .catch(err => console.log(err));

}

const postAddHotelGallery = (req, res, next)=>{
    const uploads = req.files;
    const hotelId = req.body.hotelId;
    const hotelImages = [];

    for(let i=0; i< uploads.length; i++){
        hotelImages.push(uploads[i].filename)
    }

    const gallery = new hotelGallery({
        hotelId: hotelId,
        images: hotelImages
    })
    
    gallery
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Gallery');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err)
        });
}

const postDeleteGalleryImage = (req, res) => {
  //recieve the gallery id and the image name
  const galleryId = req.body.galleryId;
  const image = req.body.image;
  const hotelId = req.body.hotelId;
  hotelGallery
    .findById(galleryId)
    .then((gallery) => {
      let images = gallery.images;
      images.splice(images.indexOf(image), 1);
      return gallery.save();
    })
    .then((result) => {
        delImage(image)
      console.log("UPDATED Gallery!");
      res.redirect("/Hotels/viewHotelImages/" + hotelId);
    })
    .catch((err) => console.log(err));
};


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

    Areas.find()
    .then(areas => {
        res.render('./pages/Tours/addTours', {
            areas: areas,
            pageTitle: 'Add tour',
            path: '/Tours/tour-list'
        });
    })
    .catch(err => console.log(err));

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

    const tourId = req.params.id;
    Tours.findById(tourId)
        .then( tour => {
            if (!tour) {
                return res.redirect('/');
            }
            res.render('./pages/Tours/viewTour', {
                pageTitle: 'View Tour',
                path: '/tours/tour',
                tour: tour
            });
        })
        .catch(err => console.log(err));
}

const editTour = (req, res, next) => {

    const tourId = req.params.id;
    Tours.findById(tourId)
        .then(tour => {
            if (!tour) {
                return res.redirect('/');
            }
            return Areas.find().then( areas => {
                return { tour: tour, areas: areas }
            })
        }).
        then( data => {
            res.render('./pages/Tours/editTour', {
                pageTitle: 'Edit Tour',
                path: '/admin/edit-tour',
                data: data
            });
        })
        .catch(err => console.log(err));

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

const postEditTour = (req, res, next)=>{

    const tourId = req.body.tourId;
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

    Tours.findById(tourId)
        .then(tour => {
            tour.tourType = tourType;
            tour.startDate = startDate;
            tour.endDate = endDate;
            tour.fromPlace = fromPlace;
            tour.toPlace = toPlace;
            tour.days = days;
            tour.nights = nights;
            tour.availableSeats = availableSeats;
            tour.chargesPerHead = chargesPerHead;
            tour.description = description;
            return tour.save();
        })
        .then(result => {
            console.log('UPDATED Tour!');
            res.redirect('/');
        })
        .catch(err => console.log(err));

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

}