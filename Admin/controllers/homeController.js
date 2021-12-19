const delImage = require('../util/file')
const Areas = require('../models/Area')
const Tours = require('../models/Tour')
const Hotels = require('../models/Hotel')
const hotelGallery = require('../models/hotelGallery')
const Appartments = require('../models/Appartment')
const appartmentGallery = require('../models/AppartmentGallery')
const Rooms = require('../models/Room')
const roomGallery = require('../models/RoomGallery')
const Vehicles = require('../models/Vehicles')
const vehicleGallery = require('../models/vehicleGallery')
const sliderGallery = require('../models/sliderGallery')
const Users = require('../models/User')
const Updates = require('../models/Updates')

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
                return res.render('./pages/Errors/error', { desc: 'The recored does\'t exist' });
            }
            res.render('./pages/Areas/editArea', {
                pageTitle: 'Edit Area',
                path: '/admin/edit-area',
                area: area
            });
        })
        .catch(err => res.render('./pages/Errors/error'));
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
            res.redirect('/Areas/addAreas');
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
            res.redirect('/Areas/areaList');
        })
        .catch(err => console.log(err));
};

const postDeleteArea = (req, res) => {
    const areaId = req.body.id;
    console.log(areaId)
    Areas.findByIdAndDelete(areaId)
        .then(() => {
            console.log('Deleted area');
            res.sendStatus(200);
        })
        .catch(err => res.sendStatus(204));
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
            return Areas.find().then(areas => {
                return { hotel: hotel, areas: areas }
            })
        }).
        then(data => {
            res.render('./pages/Hotels/editHotel', {
                pageTitle: 'Edit Tour',
                path: '/admin/edit-tour',
                data: data
            });
        })
        .catch(err => console.log(err));

}

const hotelApproved = (req, res, next) => {
    Hotels.find({ approvedStatus: true })
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
    Hotels.find({ approvedStatus: false })
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
            if (!hotels) {
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
    res.render('./pages/Hotels/addHotelImages', { hotelId: hotelId })
}

const galleryList = (req, res, next) => {

    hotelGallery.find()
        .populate('hotelId')
        .then(galleries => {
            if (!galleries) {
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
    hotelGallery.findOne({ hotelId: hotelId })
        .then(gallery => {
            if (!gallery) {
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
    const roomService = req.body.roomService;
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
        roomService: roomService,
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
            res.redirect('/Hotels/hotelsList');
        })
        .catch(err => {
            console.log(err);
        });
};

const postEditHotel = (req, res, next) => {

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
            res.redirect('/Hotels/hotelsList');
        })
        .catch(err => console.log(err));

}

const postAddHotelGallery = async (req, res, next) => {
    const uploads = req.files;
    const hotelId = req.body.hotelId;
    const hotelImages = [];

    for (let i = 0; i < uploads.length; i++) {
        hotelImages.push(uploads[i].filename)
    }

    const filter = { hotelId: hotelId };
    const update = { $push: { images: hotelImages } };

    const existingGallery = await hotelGallery.findOneAndUpdate(filter, update, {
        new: true
    });
    if (existingGallery) {
        console.log('the gallery updated')
        res.redirect('/Hotels/viewHotelImages/' + hotelId)
    } else {
        const gallery = new hotelGallery({
            hotelId: hotelId,
            images: hotelImages
        })
        gallery
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Gallery');
                res.redirect('/Hotels/viewHotelImages/' + hotelId);
            })
            .catch(err => {
                console.log(err)
            });
    }

}

const postDeleteHotel = (req, res) => {

    const hotelId = req.body.id;
    Hotels.findByIdAndDelete(hotelId)
        .then(() => {
            hotelGallery.findOneAndDelete({ hotelId: hotelId }, function (err, docs) {
                if (err) {
                    res.sendStatus(204)
                    console.log('Hotel deleted but gallery is still there')
                    console.log(err)
                }
                else {
                    console.log('Deleted Hotel and its gallery');
                    res.sendStatus(200);
                }
            });
        })
        .catch(err => res.sendStatus(204));
}


const postDeleteGalleryImage = (req, res) => {

    const galleryId = req.body.galleryId;
    const image = req.body.image;
    const hotelId = req.body.hotelId;
    let images = [];
    hotelGallery
        .findById(galleryId)
        .then((gallery) => {
            images = gallery.images;
            images.splice(images.indexOf(image), 1);
            if (images.length === 0) {
                return hotelGallery.findByIdAndDelete(galleryId)
            } else {
                return gallery.save();
            }
        })
        .then((result) => {
            delImage(image)
            console.log("UPDATED Gallery!");
            if (images.length === 0) {
                res.redirect('/')
            } else {
                res.redirect("/Hotels/viewHotelImages/" + hotelId);
            }
        })
        .catch((err) => console.log(err));
};


// Appartments / Houses
const appartmentsHouses = (req, res, next) => {
    Areas.find()
        .then(areas => {
            res.render('./pages/Appartments/addAppartment', {
                areas: areas,
                pageTitle: 'add appartment',
                path: '/Appartments/add-appartment'
            });
        })
        .catch(err => console.log(err));
}

const appartmentHouseList = (req, res, next) => {
    Appartments.find()
        .then(appartments => {
            res.render('./pages/Appartments/appartmentHouseList', {
                appartments: appartments,
                pageTitle: 'Appartments List',
                path: '/Appartments/appartment-list'
            });
        })
        .catch(err => console.log(err));
}

const editAppartmentHouse = (req, res, next) => {
    const appartId = req.params.id;
    Appartments.findById(appartId)
        .then(appart => {
            if (!appart) {
                return res.redirect('/');
            }
            return Areas.find().then(areas => {
                return { appart: appart, areas: areas }
            })
        }).
        then(data => {
            res.render('./pages/Appartments/editAppartmentHouse', {
                pageTitle: 'Edit Appartment/House',
                path: '/Appartment/edit-Appartment',
                data: data
            });
        })
        .catch(err => console.log(err));
}

const addGallery = (req, res, next) => {
    const appartId = req.params.id;
    res.render('./pages/Appartments/addGalleryAppartments', { appartId: appartId })
}

const editGalleryAppartments = (req, res, next) => {

    const appartId = req.params.id;
    appartmentGallery.findOne({ appartmentId: appartId })
        .then(gallery => {
            if (!gallery) {
                res.redirect('/')
            } else {
                res.render('./pages/Appartments/editGalleryAppartments', {
                    gallery: gallery,
                    pageTitle: 'Gallery List',
                    path: '/Hotels/gallery-list'
                });
            }

        })
        .catch(err => console.log(err));

}

const appartmentList = (req, res, next) => {
    Appartments.find({ appartmentType: 'appartment' })
        .then(appartments => {
            res.render('./pages/Appartments/appartmentList', {
                aparts: appartments,
                pageTitle: 'Appartments List',
                path: '/Appartments/appartment-list'
            });
        })
        .catch(err => console.log(err));
}

const housesList = (req, res, next) => {
    Appartments.find({ appartmentType: 'house' })
        .then(houses => {
            res.render('./pages/Appartments/housesList', {
                houses: houses,
                pageTitle: 'Appartments List',
                path: '/Appartments/appartment-list'
            });
        })
        .catch(err => console.log(err));
}

const addGalleryHouses = (req, res, next) => {
    res.render('./pages/Appartments/addGalleryHouses')
}

const editGalleryHouses = (req, res, next) => {
    res.render('./pages/Appartments/editGalleryHouses')
}

const postAddAppartment = (req, res, next) => {
    const name = req.body.appartName;
    const price = req.body.price;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const appartType = req.body.appartType;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    // const approvedStatus = req.body.status;
    const appartment = new Appartments({
        appartmentName: name,
        contact: contact,
        price: price,
        contact: contact,
        parking: parking,
        area: area,
        appartmentType: appartType,
        address: address,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        loginEmail: loginEmail,
        loginPassword: loginPassword,
        availibilityStatus: true
    });
    appartment
        .save()
        .then(result => {
            // console.log(result);
            console.log('appartment added');
            res.redirect('/Appartments/appartmentHouseList');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditAppartment = (req, res, next) => {

    const appartId = req.body.appartId;
    const name = req.body.appartName;
    const price = req.body.price;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const appartType = req.body.appartType;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    const availibilityStatus = req.body.status;

    Appartments.findById(appartId)
        .then(appart => {
            appart.appartmentName = name;
            appart.price = price;
            appart.contact = contact;
            appart.parking = parking;
            appart.area = area;
            appart.appartmentType = appartType;
            appart.address = address;
            appart.ownerName = ownerName;
            appart.ownerCNIC = ownerCNIC;
            appart.ownerContact = ownerContact;
            appart.loginEmail = loginEmail;
            appart.loginPassword = loginPassword;
            appart.availibilityStatus = availibilityStatus;
            return appart.save();
        })
        .then(result => {
            console.log('UPDATED appartment/house!');
            res.redirect('/Appartments/appartmentHouseList');
        })
        .catch(err => console.log(err));

}

const postDeleteAppartment = (req, res) => {

    const appartId = req.body.id;
    Appartments.findByIdAndDelete(appartId)
        .then(() => {
            appartmentGallery.findOneAndDelete({ appartmentId: appartId }, function (err, docs) {
                if (err) {
                    res.sendStatus(204)
                    console.log('appartment deleted but gallery is still there')
                    console.log(err)
                }
                else {
                    console.log('Deleted appartment and its gallery');
                    res.sendStatus(200);
                }
            });
        })
        .catch(err => res.sendStatus(204));
}

const postAddAppartmentGallery = async (req, res, next) => {
    const uploads = req.files;
    const appartId = req.body.appartId;
    const appartmentImages = [];

    for (let i = 0; i < uploads.length; i++) {
        appartmentImages.push(uploads[i].filename)
    }

    const filter = { appartmentId: appartId };
    const update = { $push: { images: appartmentImages } };

    const existingGallery = await appartmentGallery.findOneAndUpdate(filter, update, {
        new: true
    });
    if (existingGallery) {
        console.log('the gallery updated')
        res.redirect('/Appartments/editGallery/' + appartId)
    } else {
        const gallery = new appartmentGallery({
            appartmentId: appartId,
            images: appartmentImages
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

}

const postDeleteAppartmentGalleryImage = (req, res) => {
    //recieve the gallery id and the image name
    const galleryId = req.body.galleryId;
    const image = req.body.image;
    const appartId = req.body.appartId;
    let images = [];
    appartmentGallery
        .findById(galleryId)
        .then((gallery) => {
            images = gallery.images;
            images.splice(images.indexOf(image), 1);
            if (images.length === 0) {
                return appartmentGallery.findByIdAndDelete(galleryId)
            } else {
                return gallery.save();
            }
        })
        .then((result) => {
            delImage(image)
            console.log("UPDATED Gallery!");
            if (images.length === 0) {
                res.redirect('/')
            } else {
                res.redirect("/Appartments/editGallery/" + appartId);
            }
        })
        .catch((err) => console.log(err));
};

// Rooms
const addRoom = (req, res, next) => {
    Areas.find()
        .then(areas => {
            if (!areas) {
                console.log('no area found')
                return res.redirect('/');
            }
            return Hotels.find().then(hotels => {
                if (!hotels) {
                    console.log('no hotels found')
                }
                return { areas: areas, hotels: hotels }
            })
        }).
        then(data => {
            res.render('./pages/Rooms/addRoom', {
                pageTitle: 'Rooms',
                path: '/Rooms/add-room',
                data: data
            });
        })
        .catch(err => console.log(err));
}

const roomList = (req, res, next) => {
    Rooms.find()
        .then(rooms => {
            res.render('./pages/Rooms/roomList', {
                rooms: rooms,
                pageTitle: 'Room List',
                path: '/Rooms/room-list'
            });
        })
        .catch(err => console.log(err));
}

const editRoom = async (req, res, next) => {

    const id = req.params.id;
    const areas = await Areas.find();
    const hotels = await Hotels.find();

    if (areas && hotels) {
        Rooms.findById(id)
            .then(room => {
                if (!room) {
                    console.log('no room found')
                    return res.redirect('/');
                }
                res.render('./pages/Rooms/editRoom', {
                    areas: areas,
                    hotels: hotels,
                    room: room
                })

            })
            .catch(err => console.log(err));
    } else {
        console.log('something went wrong')
    }
}

const addRoomGallery = (req, res, next) => {
    const roomId = req.params.id;
    res.render('./pages/Rooms/addRoomGallery', { roomId: roomId })
}

const editRoomGallery = (req, res, next) => {
    const roomId = req.params.id;
    roomGallery.findOne({ roomId: roomId })
        .then(gallery => {
            if (!gallery) {
                res.redirect('/')
            } else {
                res.render('./pages/Rooms/editRoomGallery', {
                    gallery: gallery,
                    pageTitle: 'Gallery List',
                    path: '/Rooms/gallery-list'
                });
            }
        })
        .catch(err => console.log(err));
}

const postAddRoom = (req, res) => {
    const roomNo = req.body.roomNo;
    const hotel = JSON.parse(req.body.hotel);
    const area = JSON.parse(req.body.area);
    const beds = req.body.beds;
    const hotWater = req.body.hotWater;
    const balcony = req.body.balcony;
    const status = req.body.status;
    const location = req.body.location;
    const charges = req.body.charges;
    const size = req.body.size;
    const occupency = req.body.occupency;
    const bedSize = req.body.bedSize;

    const room = new Rooms({
        roomNo: roomNo,
        hotelId: hotel.hotelId,
        hotelName: hotel.hotelName,
        areaId: area.areaId,
        areaName: area.areaName,
        beds: beds,
        hotWater: hotWater,
        balcony: balcony,
        status: status,
        location: location,
        charges: charges,
        size: size,
        occupency: occupency,
        bedSize: bedSize
    });

    room
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Room');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });

}

const postEditRoom = (req, res) => {

    const roomId = req.body.roomId;
    const roomNo = req.body.roomNo;
    const hotel = JSON.parse(req.body.hotel);
    const area = JSON.parse(req.body.area);
    const beds = req.body.beds;
    const hotWater = req.body.hotWater;
    const balcony = req.body.balcony;
    const roomServices = req.body.roomService;
    const status = req.body.status;
    const location = req.body.location;
    const charges = req.body.charges;

    Rooms.findById(roomId)
        .then(room => {
            room.roomNo = roomNo;
            room.hotelId = hotel.hotelId;
            room.hotelName = hotel.hotelName;
            room.areaId = area.areaId;
            room.areaName = area.areaName;
            room.beds = beds;
            room.hotWater = hotWater;
            room.balcony = balcony;
            room.roomService = roomServices;
            room.status = status;
            room.location = location;
            room.charges = charges;

            return room.save()
        })
        .then(result => {
            console.log('room updated');
            res.redirect('/Rooms/roomList')
        })
        .catch(err => {
            console.log(err);
        });

}

const postAddRoomGallery = async (req, res) => {
    const uploads = req.files;
    const roomId = req.body.roomId;
    const roomImages = [];

    for (let i = 0; i < uploads.length; i++) {
        roomImages.push(uploads[i].filename)
    }

    const filter = { roomId: roomId };
    const update = { $push: { images: roomImages } };

    const existingGallery = await roomGallery.findOneAndUpdate(filter, update, {
        new: true
    });
    if (existingGallery) {
        console.log('the gallery updated')
        res.redirect('/Rooms/editGallery/' + roomId)
    } else {
        const gallery = new roomGallery({
            roomId: roomId,
            images: roomImages
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
}

const postDeleteRoomGalleryImage = (req, res) => {

    const galleryId = req.body.galleryId;
    const image = req.body.image;
    const roomId = req.body.roomId;
    let images = [];
    roomGallery
        .findById(galleryId)
        .then((gallery) => {
            images = gallery.images;
            images.splice(images.indexOf(image), 1);
            if (images.length === 0) {
                return roomGallery.findByIdAndDelete(galleryId)
            } else {
                return gallery.save();
            }
        })
        .then((result) => {
            delImage(image)
            console.log("UPDATED Gallery!");
            if (images.length === 0) {
                res.redirect('/')
            } else {
                res.redirect("/Rooms/editGallery/" + roomId);
            }
        })
        .catch((err) => console.log(err));
};

// Vehicle
const addVehicle = (req, res, next) => {
    res.render('./pages/Vehicles/addVehicles')
}

const vehicleList = (req, res, next) => {
    Vehicles.find()
        .then(vehicles => {
            res.render('./pages/Vehicles/vehicleList', {
                vehicles: vehicles,
                pageTitle: 'Vehicle List',
                path: '/Vehicles/vehicles-list'
            });
        })
        .catch(err => console.log(err));
}


const editVehicle = (req, res, next) => {
    const id = req.params.id;

    Vehicles.findById(id)
        .then(vehicle => {
            if (!vehicle) {
                console.log('no room found')
                return res.redirect('/');
            }
            res.render('./pages/Vehicles/editVehicle', {
                vehicle: vehicle
            })

        })
        .catch(err => console.log(err));

}

const addVehicleGallery = (req, res, next) => {
    const vehicleId = req.params.id;
    res.render('./pages/Vehicles/addVehicleGallery', { vehicleId: vehicleId })
}

const editVehicleGallery = (req, res, next) => {

    const vehicleId = req.params.id;
    vehicleGallery.findOne({ vehicleId: vehicleId })
        .then(gallery => {
            if (!gallery) {
                res.redirect('/')
            } else {
                res.render('./pages/Vehicles/editVehicleGallery', {
                    gallery: gallery,
                    pageTitle: 'Gallery List',
                    path: '/Vehicle/gallery-list'
                });
            }
        })
        .catch(err => console.log(err));

}

const postAddVehicle = (req, res) => {
    const category = req.body.category;
    const vehicleNo = req.body.vehicleNo;
    const model = req.body.model;
    const seats = req.body.seats;
    const status = req.body.status;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const ownerAddress = req.body.ownerAddress;

    const vehicle = new Vehicles({
        vehicleCategory: category,
        vehicleNo: vehicleNo,
        model: model,
        seats: seats,
        availabilityStatus: status,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        ownerAddress: ownerAddress
    });
    vehicle
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added vehicle');
            res.redirect('/Vehicles/vehicleList');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditVehicle = (req, res) => {
    const id = req.body.id;
    const category = req.body.category;
    const vehicleNo = req.body.vehicleNo;
    const model = req.body.model;
    const condition = req.body.condition;
    const status = req.body.status;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const ownerAddress = req.body.ownerAddress;

    Vehicles.findById(id)
        .then(vehicle => {
            vehicle.vehicleCategory = category;
            vehicle.vehicleNo = vehicleNo;
            vehicle.model = model;
            vehicle.condition = condition;
            vehicle.availabilityStatus = status;
            vehicle.ownerName = ownerName;
            vehicle.ownerCNIC = ownerCNIC;
            vehicle.ownerContact = ownerContact;
            vehicle.ownerAddress = ownerAddress;
            return vehicle.save()
        })
        .then(result => {
            console.log('Updated vehicle');
            res.redirect('/Vehicles/vehicleList');
        })
        .catch(err => {
            console.log(err);
        });
}

const postDeleteVehicle = (req, res) => {

    const vehicleId = req.body.id;
    Vehicles.findByIdAndDelete(vehicleId)
        .then(() => {
            vehicleGallery.findOneAndDelete({ vehicleId: vehicleId }, function (err, docs) {
                if (err) {
                    res.sendStatus(204)
                    console.log('vehicle deleted but gallery is still there')
                    console.log(err)
                }
                else {
                    console.log('Deleted Vehicle and its gallery');
                    res.sendStatus(200);
                }
            });
        })
        .catch(err => res.sendStatus(204));
}

const postAddVehicleGallery = async (req, res) => {
    const uploads = req.files;
    const vehicleId = req.body.vehicleId;
    const vehicleImages = [];

    for (let i = 0; i < uploads.length; i++) {
        vehicleImages.push(uploads[i].filename)
    }

    const filter = { vehicleId: vehicleId };
    const update = { $push: { images: vehicleImages } };

    const existingGallery = await vehicleGallery.findOneAndUpdate(filter, update, {
        new: true
    });
    if (existingGallery) {
        console.log('the gallery updated')
        res.redirect('/Vehicles/editVehicleGallery/' + vehicleId)
    } else {
        const gallery = new vehicleGallery({
            vehicleId: vehicleId,
            images: vehicleImages
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
}

const postDeleteVehiclesGalleryImage = (req, res) => {

    const galleryId = req.body.galleryId;
    const image = req.body.image;
    const vehicleId = req.body.vehicleId;
    let images = [];
    vehicleGallery
        .findById(galleryId)
        .then((gallery) => {
            images = gallery.images;
            images.splice(images.indexOf(image), 1);
            if (images.length === 0) {
                return vehicleGallery.findByIdAndDelete(galleryId)
            } else {
                return gallery.save();
            }
        })
        .then((result) => {
            delImage(image)
            console.log("UPDATED Gallery!");
            if (images.length === 0) {
                res.redirect('/')
            } else {
                res.redirect("/Vehicles/editVehicleGallery/" + vehicleId);
            }
        })
        .catch((err) => console.log(err));
};

// Updates / Blog
const addUpdates = (req, res, next) => {
    res.render('./pages/Updates/addUpdates')
}

const updateList = (req, res, next) => {
    Updates.find()
        .then(updates => {
            res.render('./pages/Updates/updateList', {
                updates: updates,
                pageTitle: 'Updates List',
                path: '/Updates/update-list'
            });
        })
        .catch(err => console.log(err));

}

const editBlog = (req, res, next) => {

    const id = req.params.id;
    Updates.findById(id)
        .then(update => {
            if (!update) {
                console.log('no update found')
                return res.redirect('/');
            }
            res.render('./pages/Updates/editUpdate', {
                update: update
            })

        })
        .catch(err => console.log(err));

}

const deleteBlog = (req, res, next) => {
    res.render('./pages/Updates/deleteBlog')
}

const postAddUpdate = (req, res) => {
    const heading = req.body.heading;
    const author = req.body.author;
    const date = new Date()
    const desc = req.body.desc;

    const update = new Updates({
        heading: heading,
        author: author,
        date: date,
        description: desc
    });

    update
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added update');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditUpdate = (req, res) => {
    console.log('ding ding')
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

const tourList = (req, res, next) => {
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
        .then(tour => {
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
            return Areas.find().then(areas => {
                return { tour: tour, areas: areas }
            })
        }).
        then(data => {
            res.render('./pages/Tours/editTour', {
                pageTitle: 'Edit Tour',
                path: '/admin/edit-tour',
                data: data
            });
        })
        .catch(err => console.log(err));

}

const postAddTour = (req, res) => {

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

const postEditTour = (req, res, next) => {

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

const postDeleteTour = (req, res) => {

    const tourId = req.body.id;
    Tours.findByIdAndDelete(tourId)
        .then(result => {
            console.log('Tours deleted')
            res.sendStatus(200)
        })
        .catch(err => res.sendStatus(204));
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
    const galleryId = req.params.id;
    res.render('./pages/SliderImages/addSliderImages', { galleryId: galleryId })
}

const sliderImages = (req, res, next) => {

    sliderGallery.findOne()
        .then(gallery => {
            res.render('./pages/SliderImages/sliderImagesList', { gallery: gallery })
        })
        .catch(err => console.log(err));

}

const postAddSliderImages = async (req, res) => {

    const uploads = req.files;
    const galleryId = req.body.galleryId;
    const sliderImages = [];

    for (let i = 0; i < uploads.length; i++) {
        sliderImages.push(uploads[i].filename)
    }

    const filter = { id: galleryId };
    const update = { $push: { images: sliderImages } };

    const existingGallery = await sliderGallery.findOneAndUpdate(filter, update, {
        new: true
    });
    if (existingGallery) {
        console.log('the gallery updated')
        res.redirect('/SliderImages/sliderImagesList')
    } else {
        const gallery = new sliderGallery({
            images: sliderImages
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
}

const postDeleteSliderGalleryImage = (req, res) => {

    const galleryId = req.body.galleryId;
    const image = req.body.image;
    let images = [];
    sliderGallery
        .findById(galleryId)
        .then((gallery) => {
            images = gallery.images;
            images.splice(images.indexOf(image), 1);
            if (images.length === 0) {
                return sliderGallery.findByIdAndDelete(galleryId)
            } else {
                return gallery.save();
            }
        })
        .then((result) => {
            delImage(image)
            console.log("UPDATED Slider Gallery!");
            if (images.length === 0) {
                res.redirect('/')
            } else {
                res.redirect("/SliderImages/sliderImagesList");
            }
        })
        .catch((err) => console.log(err));
};


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
    Users.find()
        .then(users => {
            res.render('./pages/Users/usersList', {
                users: users,
                pageTitle: 'Users List',
                path: '/Users/users-list'
            });
        })
        .catch(err => console.log(err));
}

const editUser = (req, res, next) => {
    const userId = req.params.id;
    Users.findById(userId)
        .then(user => {
            res.render('./pages/Users/editUser', {
                user: user,
                pageTitle: 'Edit User',
                path: '/Users/edit-user'
            });
        })
        .catch(err => console.log(err));
}

const postAddUser = (req, res) => {

    const name = req.body.name;
    const contact = req.body.contact;
    const cnic = req.body.cnic;
    const gender = req.body.gender;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;
    const email = req.body.email;
    const password = req.body.password;

    const user = new Users({
        name: name,
        contact: contact,
        CNIC: cnic,
        gender: gender,
        location: location,
        address: address,
        type: type,
        email: email,
        password: password
    });

    user
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added user');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditUser = (req, res) => {

    const userId = req.body.userId;
    const name = req.body.name;
    const contact = req.body.contact;
    const cnic = req.body.cnic;
    const gender = req.body.gender;
    const location = req.body.location;
    const address = req.body.address;
    const type = req.body.type;
    const email = req.body.email;
    const password = req.body.password;

    Users.findById(userId)
        .then(user => {
            user.name = name;
            user.contact = contact;
            user.CNIC = cnic;
            user.gender = gender;
            user.location = location;
            user.address = address;
            user.type = type;
            user.email = email;
            user.password = password;
            return user.save();
        })
        .then(result => {
            console.log('UPDATED User!');
            res.redirect('/');
        })
        .catch(err => console.log(err));
}


module.exports = {
    // Login
    login,

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
    addRoom, roomList, editRoom, addRoomGallery, editRoomGallery, postAddRoom, postEditRoom, postAddRoomGallery, postDeleteRoomGalleryImage,

    // Vehicle
    addVehicle, vehicleList, editVehicle, addVehicleGallery, editVehicleGallery, postAddVehicle, postEditVehicle, postAddVehicleGallery, postDeleteVehiclesGalleryImage, postDeleteVehicle,

    // Updates / Blog
    addUpdates, updateList, editBlog, deleteBlog, postAddUpdate, postEditUpdate,

    // Tours Plans & Hiking
    addTour, tourList, viewTour, editTour, postAddTour, postEditTour, postDeleteTour,

    // Bundles and Offers
    addBundle, bundleList,

    // Slider Images
    addImagesSlider, sliderImages, postAddSliderImages, postDeleteSliderGalleryImage,

    // Customer Feedback
    feedback, viewFeedbackQuery,

    // Users
    addUser, userList, editUser, postAddUser, postEditUser

}