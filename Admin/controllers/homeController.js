const { delImg, delMultImages } = require("../util/file");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const Areas = require("../models/Location");
const Tours = require("../models/Tour");
const Hotels = require("../models/Hotel");
const Appartments = require("../models/Appartment");
const Rooms = require("../models/Room");
const Vehicles = require("../models/Vehicles");
const sliderGallery = require("../models/sliderGallery");
const Users = require("../models/SystemUsers");
const Updates = require("../models/Updates");
const vehicleCategory = require("../models/vehicleCategory");

// Login
const login = (req, res, next) => {
  res.render("./login", {
    layout: "login",
    oldInput: {
      email: "",
      passsword: "",
    },
    flashMessage: req.flash("message"),
  });
};

//postLogin
const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("../views/login", {
      path: "/login",
      pageTitle: "Login",
      layout: "login",
      flashMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }
  Users.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("message", "invalid email");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.loggedIn = true;
            req.session.user = user;
            req.flash("message", "Welcome " + user.name);
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("message", "invalid password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          req.flash("message", "invalid email or password");
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

// Dashboard
const indexView = (req, res, next) => {
  const message = req.flash("message");
  res.render("./pages/Home/home", { flashMessage: message });
};

// Areas
const addArea = (req, res, next) => {
  const message = req.flash("message");
  res.render("./pages/Areas/addAreas", { name: "", flashMessage: message });
};

const listAreas = (req, res, next) => {
  const message = req.flash("message");
  Areas.find()
    .then((areas) => {
      res.render("./pages/Areas/areaList", {
        areas: areas,
        pageTitle: "Areas List",
        path: "/Areas/area-list",
        flashMessage: message,
      });
    })
    .catch((err) => console.log(err));
};

const editArea = (req, res, next) => {
  const areaId = req.params.id;
  Areas.findById(areaId)
    .then((area) => {
      if (!area) {
        return res.render("./pages/Errors/error", {
          desc: "The recored does't exist",
        });
      }
      res.render("./pages/Areas/editArea", {
        pageTitle: "Edit Area",
        path: "/admin/edit-area",
        area: area,
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => res.render("./pages/Errors/error"));
};

const postAddArea = (req, res, next) => {
  const name = req.body.areaName;
  const area = new Areas({
    name: name,
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("../views/pages/Areas/addAreas", {
      flashMessage: errors.array()[0].msg,
      name: name,
      validationErrors: errors.array(),
    });
  }

  area
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Added Area");
      req.flash("message", "Location Added Successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).render("../views/pages/Areas/addAreas", {
        flashMessage: "Something went Wrong, please try again.",
        name: name,
      });
    });
};

const postEditArea = (req, res, next) => {
  const areaId = req.body.areaId;
  const updatedName = req.body.areaName;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("../views/pages/Areas/editArea", {
      flashMessage: errors.array()[0].msg,
      area: {
        id: areaId,
        name: updatedName,
      },
      validationErrors: errors.array(),
    });
  }

  Areas.findById(areaId)
    .then((area) => {
      area.name = updatedName;
      return area.save();
    })
    .then((result) => {
      console.log("UPDATED Area!");
      req.flash("message", "Location Updated");
      res.redirect("/Areas/areaList");
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).render("../views/pages/Areas/edit+Area", {
        flashMessage: "Something went wrong, please try again.",
        area: {
          id: areaId,
          name: updatedName,
        },
      });
    });
};

const postDeleteArea = (req, res) => {
  const areaId = req.body.id;

  Areas.findByIdAndDelete(areaId)
    .then(() => {
      console.log("Deleted location");
      res.sendStatus(200);
    })
    .catch((err) => res.sendStatus(204));
};

// Customers
const customersList = (req, res, next) => {
  res.render("./pages/Customers/customer");
};

const editMembership = (req, res, next) => {
  res.render("./pages/Customers/editMembership");
};

const viewCustomer = (req, res, next) => {
  res.render("./pages/Customers/viewCustomer");
};

// Hotels Clients
const hotelClients = (req, res, next) => {
  Areas.find()
    .then((areas) => {
      res.render("./pages/Hotels/addHotel", {
        areas: areas,
        pageTitle: "add hotel",
        path: "/Hotels/add-hotel",
        oldInput: {
          name: "",
          contact: "",
          parking: "",
          area: "",
          roomService: "",
          address: "",
          ownerName: "",
          ownerCNIC: "",
          ownerContact: "",
          loginEmail: "",
          loginPassword: "",
        },
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const hotelList = (req, res, next) => {
  Hotels.find()
    .then((hotels) => {
      res.render("./pages/Hotels/hotelsList", {
        hotels: hotels,
        pageTitle: "Hotels List",
        path: "/Hotels/hotels-list",
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const viewHotel = (req, res, next) => {
  const hotelId = req.params.id;
  Hotels.findById(hotelId)
    .then((hotel) => {
      res.render("./pages/Hotels/viewHotel", {
        hotel: hotel,
        pageTitle: "Hotels List",
        path: "/Hotels/hotel-view",
      });
    })
    .catch((err) => console.log(err));
};

const editHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotels.findById(hotelId);
    if (!hotel) {
      req.flash("message", "Could not find the Hotel");
      return res.redirect("/");
    }
    const areas = await Areas.find();

    res.render("./pages/Hotels/editHotel", {
      pageTitle: "Edit Tour",
      path: "/admin/edit-tour",
      areas: areas,
      hotel: hotel,
      flashMessage: req.flash("message"),
    });
  } catch (err) {
    console.log(err);
  }
};

const hotelApproved = (req, res, next) => {
  Hotels.find({ approvedStatus: true })
    .then((hotels) => {
      if (!hotels) {
        redirect("/");
      }
      res.render("./pages/Hotels/approvedHotels", {
        hotels: hotels,
        pageTitle: "Approved Hotels",
        path: "/Hotels/approved-hotels",
      });
    })
    .catch((err) => console.log(err));
};

const hotelUnapproved = (req, res, next) => {
  Hotels.find({ approvedStatus: false })
    .then((hotels) => {
      if (!hotels) {
        redirect("/");
      }
      res.render("./pages/Hotels/unapprovedHotels", {
        hotels: hotels,
        pageTitle: "Approved Hotels",
        path: "/Hotels/approved-hotels",
      });
    })
    .catch((err) => console.log(err));
};

const addGalleryHotel = (req, res, next) => {
  Hotels.find()
    .then((hotels) => {
      if (!hotels) {
        res.redirect("/");
      }
      res.render("./pages/Hotels/addHotelGallery", {
        hotels: hotels,
        pageTitle: "Add Gallery",
        path: "/Hotels/add-gallery",
      });
    })
    .catch((err) => console.log(err));
};

const addHotelImages = (req, res, next) => {
  const hotelId = req.query.hotelId;
  res.render("./pages/Hotels/addHotelImages", { hotelId: hotelId });
};

const galleryList = (req, res, next) => {
  Hotels.find()
    .then((hotels) => {
      if (!hotels) {
        res.redirect("/");
      }
      res.render("./pages/Hotels/galleryList", {
        hotels: hotels,
        pageTitle: "Gallery List",
        path: "/Hotels/gallery-list",
      });
    })
    .catch((err) => console.log(err));
};

const viewHotelImages = (req, res, next) => {
  const hotelId = req.params.id;
  Hotels.findById(hotelId)
    .then((hotel) => {
      if (!hotel) {
        res.redirect("/");
      }
      res.render("./pages/Hotels/viewHotelImages", {
        hotelId: hotel.id,
        gallery: hotel.gallery,
        pageTitle: "Gallery List",
        path: "/Hotels/gallery-list",
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

//Hotel post Requests
const postAddHotel = async (req, res, next) => {
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const areas = await Areas.find();
    return res.status(422).render("../views/pages/Hotels/addHotel", {
      path: "/Hotesl/addHotel",
      pageTitle: "Hotel",
      areas: areas,
      flashMessage: errors.array()[0].msg,
      oldInput: {
        name: name,
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
      },
      validationErrors: errors.array(),
    });
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(16);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(loginPassword, salt);

  const hotel = new Hotels({
    name: name,
    contact: contact,
    parking: parking,
    area: area,
    roomService: roomService,
    address: address,
    ownerName: ownerName,
    ownerCNIC: ownerCNIC,
    ownerContact: ownerContact,
    loginEmail: loginEmail,
    loginPassword: hashedPassword,
    approvedStatus: false,
  });

  try {
    await hotel.save();
    // console.log(result);
    console.log("Added Hotel");
    req.flash("message", "Hotel Data Added Successfully.");
    res.redirect("/Hotels/hotelsList");
  } catch (err) {
    console.log(err);
    const areas = await Areas.find();
    return res.status(422).render("../views/pages/Hotels/addHotel", {
      path: "/Hotesl/addHotel",
      pageTitle: "Hotel",
      areas: areas,
      flashMessage: "Something went wrong please try again.",
      oldInput: {
        name: name,
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
      },
    });
  }
};

const postEditHotel = async (req, res, next) => {

  const hotelId = req.body.hotelId;
  const name = req.body.hotelName;
  const contact = req.body.contact;
  const parking = req.body.parking;
  const area = req.body.area;
  const address = req.body.address;
  const roomService = req.body.roomService;
  const ownerName = req.body.ownerName;
  const ownerCNIC = req.body.ownerCNIC;
  const ownerContact = req.body.ownerContact;
  const loginEmail = req.body.loginEmail;
  const loginPassword = req.body.loginPassword;
  const oldLoginPassword = req.body.oldLoginPassword;
  const approvedStatus = req.body.status;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const areas = await Areas.find();
    return res.status(422).render("../views/pages/Hotels/editHotel", {
      path: "/Hotesl/addHotel",
      pageTitle: "Hotel",
      areas: areas,
      flashMessage: errors.array()[0].msg,
      hotel: {
        id: hotelId,
        name: name,
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
      },
      validationErrors: errors.array(),
    });
  }

  let salt=null;
  let hashedPassword=null;
  if(loginPassword.length> 0){
    // generate salt to hash password
    salt = await bcrypt.genSalt(16);
    // now we set user password to hashed password
    hashedPassword = await bcrypt.hash(loginPassword, salt);
  }else{
    hashedPassword = oldLoginPassword;
  }

  try {
    const hotel = await Hotels.findById(hotelId);
    (hotel.name = name),
      (hotel.contact = contact),
      (hotel.parking = parking),
      (hotel.area = area),
      (hotel.address = address),
      (hotel.ownerName = ownerName),
      (hotel.ownerCNIC = ownerCNIC),
      (hotel.ownerContact = ownerContact),
      (hotel.loginEmail = loginEmail),
      (hotel.loginPassword = hashedPassword),
      (hotel.approvedStatus = approvedStatus);

    await hotel.save();
    console.log("UPDATED Hotel!");
    req.flash("message", "Hotel Data Updated Successfully.");
    res.redirect("/Hotels/hotelsList");
  } catch (err) {
    console.log(err);
    req.flash('message', 'Something went wrong.');
    res.redirect('/');
  }
};

const postAddHotelGallery = async (req, res, next) => {
  const uploads = req.files;
  const hotelId = req.body.hotelId;
  const gallery = [];

  for (let i = 0; i < uploads.length; i++) {
    gallery.push(uploads[i].filename);
  }

  try {
    const hotel = await Hotels.findById(hotelId);
    if (hotel.gallery.length === 0) {
      hotel.gallery = gallery;
      hotel.save();
      console.log("added gallery to hotel");
      req.flash("message", "Gallery Added To Hotel Successfully");
      res.redirect("/Hotels/viewHotelImages/" + hotelId);
    } else {
      updatedGallery = hotel.gallery.concat(gallery);
      hotel.gallery = updatedGallery;
      hotel.save();
      console.log("gallery updated");
      req.flash("message", "Hotel Gallery Updated Successfully");
      res.redirect("/Hotels/viewHotelImages/" + hotelId);
    }
  } catch (err) {
    console.log(err);
  }
};

const postDeleteHotel = async (req, res) => {
  const hotelId = req.body.id;
  try {
    const hotel = await Hotels.findById(hotelId);
    const gallery = hotel.gallery;
    await Hotels.findByIdAndDelete(hotelId);
    delMultImages(gallery);
    res.sendStatus(200);
    console.log("hotel deleted");
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

const postDeleteGalleryImage = async (req, res) => {
  const image = req.body.image;
  const hotelId = req.body.id;

  try {
    const hotel = await Hotels.findById(hotelId);
    gallery = hotel.gallery;
    //removing the selected image from array
    gallery.splice(gallery.indexOf(image), 1);
    hotel.gallery = gallery;
    await hotel.save();
    delImg(image);
    console.log("UPDATED Gallery!");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

// Appartments / Houses
const appartmentsHouses = (req, res, next) => {
  Areas.find()
    .then((areas) => {
      res.render("./pages/Appartments/addAppartment", {
        areas: areas,
        pageTitle: "add appartment",
        path: "/Appartments/add-appartment",
        oldInput: {
          name: "",
          price: "",
          contact: "",
          parking: "",
          area: "",
          appartmentType: "",
          address: "",
          ownerName: "",
          ownerCNIC: "",
          ownerContact: "",
          loginEmail: "",
          loginPassword: "",
          description: "",
          features: "",
          videoUrl: "",
        },
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const appartmentHouseList = (req, res, next) => {
  Appartments.find()
    .then((appartments) => {
      res.render("./pages/Appartments/appartmentHouseList", {
        appartments: appartments,
        pageTitle: "Appartments List",
        path: "/Appartments/appartment-list",
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const editAppartmentHouse = async (req, res, next) => {
  const appartId = req.params.id;

  try {
    const appart = await Appartments.findById(appartId);

    if (!appart) {
      return res.redirect("/");
    }

    const areas = await Areas.find();
    res.render("./pages/Appartments/editAppartmentHouse", {
      pageTitle: "Edit Appartment/House",
      path: "/Appartment/edit-Appartment",
      areas: areas,
      appart: appart,
      flashMessage: req.flash("message"),
    });
  } catch (err) {
    console.log(err);
  }
};

const addGallery = (req, res, next) => {
  const appartId = req.params.id;
  res.render("./pages/Appartments/addGalleryAppartments", {
    appartId: appartId,
  });
};

const editGalleryAppartments = (req, res, next) => {
  const appartId = req.params.id;
  Appartments.findById(appartId)
    .then((appartment) => {
      if (!appartment) {
        res.redirect("/Appartments/addGallery/" + appartId);
      } else {
        res.render("./pages/Appartments/editGalleryAppartments", {
          gallery: appartment.gallery,
          appartmentId: appartment.id,
          pageTitle: "Gallery List",
          path: "/Hotels/gallery-list",
          flashMessage: req.flash("message"),
        });
      }
    })
    .catch((err) => console.log(err));
};

const appartmentList = (req, res, next) => {
  Appartments.find({ appartmentType: "appartment" })
    .then((appartments) => {
      res.render("./pages/Appartments/appartmentList", {
        aparts: appartments,
        pageTitle: "Appartments List",
        path: "/Appartments/appartment-list",
      });
    })
    .catch((err) => console.log(err));
};

const housesList = (req, res, next) => {
  Appartments.find({ appartmentType: "house" })
    .then((houses) => {
      res.render("./pages/Appartments/housesList", {
        houses: houses,
        pageTitle: "Appartments List",
        path: "/Appartments/appartment-list",
      });
    })
    .catch((err) => console.log(err));
};

const addGalleryHouses = (req, res, next) => {
  res.render("./pages/Appartments/addGalleryHouses");
};

const editGalleryHouses = (req, res, next) => {
  res.render("./pages/Appartments/editGalleryHouses");
};

//Appartments post requests
const postAddAppartment = async (req, res, next) => {
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
  const description = req.body.description;
  const features = req.body.features;
  const videoUrl = req.body.videoUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const areas = await Areas.find();
    return res.status(422).render("../views/pages/Appartments/addAppartment", {
      path: "/Appartments/addAppartment",
      pageTitle: "Appartment",
      areas: areas,
      flashMessage: errors.array()[0].msg,
      oldInput: {
        name: name,
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
        description: description,
        features: features,
        videoUrl: videoUrl,
      },
      validationErrors: errors.array(),
    });
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(16);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(loginPassword, salt);

  const approvedStatus = req.body.status;
  const appartment = new Appartments({
    name: name,
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
    loginPassword: hashedPassword,
    availibilityStatus: false,
    description: description,
    features: features,
    videoUrl: videoUrl,
  });

  try {
    await appartment.save();
    // console.log(result);
    console.log("appartment added");
    req.flash("message", "Appartment Added Successfully");
    res.redirect("/Appartments/appartmentHouseList");
  } catch (err) {
    console.log(err);
  }
};

const postEditAppartment = async (req, res, next) => {

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
  const oldLoginPassword = req.body.oldLoginPassword;
  const availibilityStatus = req.body.status;
  const description = req.body.description;
  const features = req.body.features;
  const videoUrl = req.body.videoUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const areas = await Areas.find();
    return res
      .status(422)
      .render("../views/pages/Appartments/editAppartmentHouse", {
        path: "/Appartments/addAppartment",
        pageTitle: "Appartment",
        areas: areas,
        flashMessage: errors.array()[0].msg,
        appart: {
          id: appartId,
          name: name,
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
          description: description,
          features: features,
          videoUrl: videoUrl,
        },
        validationErrors: errors.array(),
      });
  }

  let salt=null;
  let hashedPassword=null;
  if (loginPassword.length > 0) {

    // generate salt to hash password
    salt = await bcrypt.genSalt(16);
    // now we set user password to hashed password
    hashedPassword = await bcrypt.hash(loginPassword, salt);

  } else {
    hashedPassword = oldLoginPassword;
  }

  try {
    const appart = await Appartments.findById(appartId);
    appart.name = name;
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
    appart.loginPassword = hashedPassword;
    appart.availibilityStatus = availibilityStatus;
    appart.description = description;
    appart.features = features;
    appart.videoUrl = videoUrl;
    await appart.save();
    console.log("UPDATED appartment/house!");
    req.flash("message", "Appartment Data Updated Successfully");
    res.redirect("/Appartments/appartmentHouseList");
  } catch (err) {
    console.log(err);
  }
};

const postDeleteAppartment = async (req, res) => {
  const appartId = req.body.id;
  try {
    const appartment = await Appartments.findById(appartId);
    const gallery = appartment.gallery;
    await Appartments.findByIdAndDelete(appartId);
    delMultImages(gallery);
    res.sendStatus(200);
    console.log("appartment deleted");
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

const postAddAppartmentGallery = async (req, res, next) => {
  const uploads = req.files;
  const appartId = req.body.appartId;
  const gallery = [];

  for (let i = 0; i < uploads.length; i++) {
    gallery.push(uploads[i].filename);
  }

  try {
    const appartment = await Appartments.findById(appartId);
    if (appartment.gallery.length === 0) {
      appartment.gallery = gallery;
      appartment.save();
      console.log("added gallery to appartment");
      req.flash("message", "Gallery added To Appartment Successfully");
      res.redirect("/Appartments/editGallery/" + appartId);
    } else {
      updatedGallery = appartment.gallery.concat(gallery);
      appartment.gallery = updatedGallery;
      appartment.save();
      console.log("gallery updated");
      req.flash("message", "Appartment Gallery Updated Successfully");
      res.redirect("/Appartments/editGallery/" + appartId);
    }
  } catch (err) {
    console.log(err);
  }
};

const postDeleteAppartmentGalleryImage = (req, res) => {
  //recieve the gallery id and the image name
  const image = req.body.image;
  const appartId = req.body.appartId;

  Appartments.findById(appartId)
    .then((appartment) => {
      gallery = appartment.gallery;
      //removing the selected image from array
      gallery.splice(gallery.indexOf(image), 1);
      appartment.gallery = gallery;
      return appartment.save();
    })
    .then((result) => {
      delImg(image);
      console.log("UPDATED Gallery!");
      res.redirect("/Appartments/editGallery/" + appartId);
    })
    .catch((err) => console.log(err));
};

// Rooms
const addRoom = async (req, res, next) => {

  try {
    const areas = await Areas.find();
    const hotels = await Hotels.find();

    res.render("./pages/Rooms/addRoom", {
      pageTitle: "Rooms",
      path: "/Rooms/add-room",
      areas: areas,
      hotels: hotels,
      hotelId: '',
      areaId: '',
      oldInput: {
        roomNo: '',
        areaName: '',
        beds: '',
        hotWater: '',
        balcony: '',
        status: '',
        location: '',
        charges: '',
        size: '',
        occupency: '',
        bedSize: '',
        description: '',
        features: '',
        videoUrl: ''
      },
      flashMessage: req.flash("message"),
    });
  } catch (err) {
    console.log(err);
  }
};

const roomList = async (req, res, next) => {
  
  try {
    const hotels = await Hotels.find();
    const areas = await Areas.find();
    const rooms = await Rooms.find();
  
    res.render("./pages/Rooms/roomList", {
      rooms: rooms,
      areas: areas,
      hotels: hotels,
      pageTitle: "Room List",
      path: "/Rooms/room-list",
      flashMessage: req.flash("message"),
    });
  } catch (err) {
    console.log(err);
    req.flash("message", "Something went wrong.");
    res.redirect("/");
  }
  
};

const editRoom = async (req, res, next) => {
  const id = req.params.id;

  try {
    const areas = await Areas.find();
    const hotels = await Hotels.find();
    const room = await Rooms.findById(id);

    res.render("./pages/Rooms/editRoom", {
      areas: areas,
      hotels: hotels,
      room: room,
      flashMessage: req.flash('message')
    });

  } catch (err) {
    console.log(err);
    console.log("something went wrong");
    req.flash("message", "Something went wrong.");
    res.redirect("/");
  }
};

const addRoomGallery = (req, res, next) => {
  const roomId = req.params.id;
  res.render("./pages/Rooms/addRoomGallery", { roomId: roomId });
};

const editRoomGallery = (req, res, next) => {
  const roomId = req.params.id;
  Rooms.findById(roomId)
    .then((room) => {
      if (room.gallery.length === 0) {
        res.redirect("/Rooms/addGallery/" + roomId);
      } else {
        res.render("./pages/Rooms/editRoomGallery", {
          gallery: room.gallery,
          roomId: room.id,
          pageTitle: "Gallery List",
          path: "/Rooms/gallery-list",
          flashMessage: req.flash("message"),
        });
      }
    })
    .catch((err) => console.log(err));
};

// Room post requests
const postAddRoom = async (req, res) => {
  const roomNo = req.body.roomNo;
  const hotel = req.body.hotel;
  const area = req.body.area;
  const beds = req.body.beds;
  const hotWater = req.body.hotWater;
  const balcony = req.body.balcony;
  const status = req.body.status;
  const location = req.body.location;
  const charges = req.body.charges;
  const size = req.body.size;
  const occupency = req.body.occupency;
  const bedSize = req.body.bedSize;
  const description = req.body.description;
  const features = req.body.features;
  const videoUrl = req.body.videoUrl;

  const room = new Rooms({
    roomNo: roomNo,
    hotelId: hotel,
    areaId: area,
    areaName: area.areaName,
    beds: beds,
    hotWater: hotWater,
    balcony: balcony,
    status: status,
    location: location,
    charges: charges,
    size: size,
    occupency: occupency,
    bedSize: bedSize,
    description: description,
    features: features,
    videoUrl: videoUrl,
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const areas = await Areas.find();
    const hotels = await Hotels.find();
    return res.status(422).render("../views/pages/Rooms/addRoom", {
      path: "/Room/addRoom",
      pageTitle: "Rooms",
      areas: areas,
      hotels: hotels,
      flashMessage: errors.array()[0].msg,
      hotelId: hotel,
      areaId: area,
      oldInput: {
        roomNo: roomNo,
        areaName: area.areaName,
        beds: beds,
        hotWater: hotWater,
        balcony: balcony,
        status: status,
        location: location,
        charges: charges,
        size: size,
        occupency: occupency,
        bedSize: bedSize,
        description: description,
        features: features,
        videoUrl: videoUrl,
      },
      validationErrors: errors.array(),
    });
  }

  try {
    await room.save();
    // console.log(result);
    console.log("Added Room");
    req.flash("message", "Room Added Successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    req.flash("message", "Something went wrong");
    res.redirect("/");
  }
};

const postEditRoom = async (req, res) => {

  const roomId = req.body.roomId;
  const roomNo = req.body.roomNo;
  const hotel = req.body.hotel;
  const area = req.body.area;
  const beds = req.body.beds;
  const hotWater = req.body.hotWater;
  const balcony = req.body.balcony;
  const status = req.body.status;
  const location = req.body.location;
  const charges = req.body.charges;
  const size = req.body.size;
  const occupency = req.body.occupency;
  const bedSize = req.body.bedSize;
  const description = req.body.description;
  const features = req.body.features;
  const videoUrl = req.body.videoUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      const areas = await Areas.find();
      const hotels = await Hotels.find();
      return res.status(422).render("../views/pages/Rooms/editRoom", {
        path: "/Room/addRoom",
        pageTitle: "Rooms",
        areas: areas,
        hotels: hotels,
        flashMessage: errors.array()[0].msg,
        hotelId: hotel,
        areaId: area,
        room: {
          id: roomId,
          roomNo: roomNo,
          areaName: area.areaName,
          beds: beds,
          hotWater: hotWater,
          balcony: balcony,
          status: status,
          location: location,
          charges: charges,
          size: size,
          occupency: occupency,
          bedSize: bedSize,
          description: description,
          features: features,
          videoUrl: videoUrl,
        },
        validationErrors: errors.array(),
      });
    } catch (err) {
      console.log(err);
      req.flash('message', 'Something went wrong.');
    }
  }

    try {
      const room = await Rooms.findById(roomId);
      room.roomNo = roomNo;
      room.hotelId = hotel;
      room.areaId = area;
      room.beds = beds;
      room.hotWater = hotWater;
      room.balcony = balcony;
      room.status = status;
      room.location = location;
      room.charges = charges;
      room.size = size;
      room.occupency = occupency;
      room.bedSize = bedSize;
      room.description = description;
      room.features = features;
      room.videoUrl = videoUrl;

      await room.save();

      console.log("room updated");
      req.flash("message", "Room Data Updated Successfully");
      res.redirect("/Rooms/roomList");
    } catch (err) {
      console.log(err);
      req.flash("message", "Something went wrong.");
      res.redirect("/");
    }
};

const postDeleteRoom = async (req, res) => {
  const roomId = req.body.id;
  try {
    const room = await Rooms.findById(roomId);
    const gallery = room.gallery;
    await Rooms.findByIdAndDelete(roomId);
    delMultImages(gallery);
    res.sendStatus(200);
    console.log("room deleted");
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

const postAddRoomGallery = async (req, res) => {
  const uploads = req.files;
  const roomId = req.body.roomId;
  const gallery = [];

  for (let i = 0; i < uploads.length; i++) {
    gallery.push(uploads[i].filename);
  }

  try {
    const room = await Rooms.findById(roomId);
    if (room.gallery.length === 0) {
      room.gallery = gallery;
      room.save();
      console.log("added gallery to room");
      req.flash("message", "Gallery Added To Room");
      res.redirect("/Rooms/editGallery/" + roomId);
    } else {
      updatedGallery = room.gallery.concat(gallery);
      room.gallery = updatedGallery;
      room.save();
      console.log("gallery updated");
      req.flash("message", "Room Gallery Updated");
      res.redirect("/Rooms/editGallery/" + roomId);
    }
  } catch (err) {
    console.log(err);
  }
};

const postDeleteRoomGalleryImage = async (req, res) => {
  const roomId = req.body.id;
  const image = req.body.image;

  try {
    const room = await Rooms.findById(roomId);
    gallery = room.gallery;
    //removing the selected image from array
    gallery.splice(gallery.indexOf(image), 1);
    room.gallery = gallery;
    await room.save();
    delImg(image);
    console.log("UPDATED Gallery!");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

// Vehicle Category (New Data)
const addCategory = (req, res, next) => {
  res.render("./pages/VehiclesCategory/addCategory", {
    flashMessage: req.flash("message"),
  });
};

const categoryList = (req, res, next) => {
  vehicleCategory
    .find()
    .then((cats) => {
      if (!cats) {
        res.redirect("/");
      } else {
        res.render("./pages/VehiclesCategory/categoryList", {
          cats: cats,
          pageTitle: "list category",
          path: "/VehiclesCategory/category-list",
          flashMessage: req.flash("message"),
        });
      }
    })
    .catch((err) => console.log(err));
};

const editCategory = (req, res, next) => {
  const catId = req.params.id;
  vehicleCategory
    .findById(catId)
    .then((cat) => {
      if (!cat) {
        res.redirect("/");
      } else {
        res.render("./pages/VehiclesCategory/editCategory", {
          cat: cat,
          pageTitle: "edit category",
          path: "/VehiclesCategory/vehicleCategory",
        });
      }
    })
    .catch((err) => console.log(err));
};

const postAddVehicleCategory = (req, res) => {
  const name = req.body.name;
  const vehicleCat = new vehicleCategory({
    name: name,
  });
  vehicleCat
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Added category");
      req.flash("message", "Vehicle Category Added Successfully");
      res.redirect("/VehiclesCategory/addCategory");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postEditVehicleCategory = (req, res) => {
  const catId = req.body.id;
  const name = req.body.name;
  vehicleCategory
    .findById(catId)
    .then((cat) => {
      cat.name = name;
      return cat.save();
    })
    .then((result) => {
      console.log("cat updated");
      req.flash("message", "Categroy Modified Successfully");
      res.redirect("/VehiclesCategory/categoryList");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Vehicle
const addVehicle = (req, res, next) => {
  vehicleCategory
    .find()
    .then((cats) => {
      if (!cats) {
        console.log("could't find categories");
        res.redirect("/VehiclesCategory/addCategory");
      } else {
        res.render("./pages/Vehicles/addVehicles", {
          cats: cats,
          pageTitle: "list category",
          path: "/VehiclesCategory/category-list",
          oldInput: {
            categoryId: "",
            categoryName: "",
            vehicleNo: "",
            model: "",
            seats: "",
            availabilityStatus: "",
            ownerName: "",
            ownerCNIC: "",
            ownerContact: "",
            ownerAddress: "",
            description: "",
            features: "",
            videoUrl: "",
          },
          flashMessage: req.flash("message"),
        });
      }
    })
    .catch((err) => console.log(err));
};

const vehicleList = (req, res, next) => {
  Vehicles.find()
    .then((vehicles) => {
      res.render("./pages/Vehicles/vehicleList", {
        vehicles: vehicles,
        pageTitle: "Vehicle List",
        path: "/Vehicles/vehicles-list",
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const editVehicle = async (req, res, next) => {
  const id = req.params.id;

  try {
    const vehicle = await Vehicles.findById(id);
    if (!vehicle) {
      console.log("no vehicle found");
      req.flash("message", "Vehicle Not Found");
      return res.redirect("/");
    }

    const cats = await vehicleCategory.find();
    res.render("./pages/Vehicles/editVehicle", {
      cats: cats,
      vehicle: vehicle,
      flashMessage: req.flash("message"),
    });
  } catch (err) {
    console.log(err);
  }
};

const addVehicleGallery = (req, res, next) => {
  const vehicleId = req.params.id;
  res.render("./pages/Vehicles/addVehicleGallery", { vehicleId: vehicleId });
};

const editVehicleGallery = (req, res, next) => {
  const vehicleId = req.params.id;
  Vehicles.findById(vehicleId)
    .then((vehicle) => {
      if (!vehicle) {
        res.redirect("/Vehicles/addVehicleGallery/" + vehicleId);
      } else {
        res.render("./pages/Vehicles/editVehicleGallery", {
          gallery: vehicle.gallery,
          vehicleId: vehicle.id,
          pageTitle: "Gallery List",
          path: "/Vehicle/gallery-list",
          flashMessage: req.flash("message"),
        });
      }
    })
    .catch((err) => console.log(err));
};

const postAddVehicle = async (req, res) => {
  const category = JSON.parse(req.body.category);
  const vehicleNo = req.body.vehicleNo;
  const model = req.body.model;
  const seats = req.body.seats;
  const status = req.body.status;
  const ownerName = req.body.ownerName;
  const ownerCNIC = req.body.ownerCNIC;
  const ownerContact = req.body.ownerContact;
  const ownerAddress = req.body.ownerAddress;
  const description = req.body.description;
  const features = req.body.features;
  const videoUrl = req.body.videoUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const cats = await vehicleCategory.find();
    return res.status(422).render("../views/pages/Vehicles/addVehicles", {
      path: "/Vehicles/addVehicle",
      pageTitle: "Vehicles",
      flashMessage: errors.array()[0].msg,
      cats: cats,
      oldInput: {
        categoryId: category.id,
        categoryName: category.name,
        vehicleNo: vehicleNo,
        model: model,
        seats: seats,
        availabilityStatus: status,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        ownerAddress: ownerAddress,
        description: description,
        features: features,
        videoUrl: videoUrl,
      },
      validationErrors: errors.array(),
    });
  }

  const vehicle = new Vehicles({
    categoryId: category.id,
    categoryName: category.name,
    vehicleNo: vehicleNo,
    model: model,
    seats: seats,
    availabilityStatus: status,
    ownerName: ownerName,
    ownerCNIC: ownerCNIC,
    ownerContact: ownerContact,
    ownerAddress: ownerAddress,
    description: description,
    features: features,
    videoUrl: videoUrl,
  });

  try {
    await vehicle.save();
    console.log("Added vehicle");
    req.flash("message", "Vehicle Added Successfully");
    res.redirect("/Vehicles/vehicleList");
  } catch (err) {
    console.log(err);
  }
};

const postEditVehicle = async (req, res) => {
  const id = req.body.id;
  const category = JSON.parse(req.body.category);
  const vehicleNo = req.body.vehicleNo;
  const model = req.body.model;
  const seats = req.body.seats;
  const status = req.body.status;
  const ownerName = req.body.ownerName;
  const ownerCNIC = req.body.ownerCNIC;
  const ownerContact = req.body.ownerContact;
  const ownerAddress = req.body.ownerAddress;
  const description = req.body.description;
  const features = req.body.features;
  const videoUrl = req.body.videoUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const cats = await vehicleCategory.find();

    return res.status(422).render("../views/pages/Vehicles/editVehicle", {
      path: "/Vehicles/addVehicle",
      pageTitle: "Vehicles",
      flashMessage: errors.array()[0].msg,
      cats: cats,
      vehicle: {
        id: id,
        categoryId: category.id,
        categoryName: category.name,
        vehicleNo: vehicleNo,
        model: model,
        seats: seats,
        availabilityStatus: status,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        ownerAddress: ownerAddress,
        description: description,
        features: features,
        videoUrl: videoUrl,
      },
      validationErrors: errors.array(),
    });
  }

  try {
    const vehicle = await Vehicles.findById(id);
    vehicle.categoryId = category.id;
    vehicle.categoryName = category.name;
    vehicle.vehicleNo = vehicleNo;
    vehicle.model = model;
    vehicle.seats = seats;
    vehicle.availabilityStatus = status;
    vehicle.ownerName = ownerName;
    vehicle.ownerCNIC = ownerCNIC;
    vehicle.ownerContact = ownerContact;
    vehicle.ownerAddress = ownerAddress;
    vehicle.description = description;
    vehicle.features = features;
    vehicle.videoUrl = videoUrl;

    await vehicle.save();

    console.log("Updated vehicle");
    req.flash("message", "Vehicle Data Updated Successfully");
    res.redirect("/Vehicles/vehicleList");
  } catch (err) {
    console.log(err);
  }
};

const postDeleteVehicle = async (req, res) => {
  const vehicleId = req.body.id;
  try {
    const vehicle = await Vehicles.findById(vehicleId);
    const gallery = vehicle.gallery;
    await Vehicles.findByIdAndDelete(vehicleId);
    delMultImages(gallery);
    res.sendStatus(200);
    console.log("vehicle deleted");
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

const postAddVehicleGallery = async (req, res) => {
  const uploads = req.files;
  const vehicleId = req.body.vehicleId;
  const gallery = [];

  for (let i = 0; i < uploads.length; i++) {
    gallery.push(uploads[i].filename);
  }

  try {
    const vehicle = await Vehicles.findById(vehicleId);
    if (vehicle.gallery.length === 0) {
      vehicle.gallery = gallery;
      vehicle.save();
      console.log("added gallery to vehicle");
      req.flash("message", "Vehicle Gallery Added Successfully");
      res.redirect("/Vehicles/editVehicleGallery/" + vehicleId);
    } else {
      updatedGallery = vehicle.gallery.concat(gallery);
      vehicle.gallery = updatedGallery;
      vehicle.save();
      console.log("gallery updated");
      req.flash("message", "Vehicle Gallery Updated Successfully");
      res.redirect("/Vehicles/editVehicleGallery/" + vehicleId);
    }
  } catch (err) {
    console.log(err);
  }
};

const postDeleteVehiclesGalleryImage = async (req, res) => {
  const image = req.body.image;
  const vehicleId = req.body.id;

  try {
    const vehicle = await Vehicles.findById(vehicleId);
    gallery = vehicle.gallery;
    //removing the selected image from array
    gallery.splice(gallery.indexOf(image), 1);
    vehicle.gallery = gallery;
    await vehicle.save();
    delImg(image);
    console.log("UPDATED Gallery!");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

// Updates / Blog
const addUpdates = (req, res, next) => {
  res.render("./pages/Updates/addUpdates");
};

const updateList = (req, res, next) => {
  Updates.find()
    .then((updates) => {
      res.render("./pages/Updates/updateList", {
        updates: updates,
        pageTitle: "Updates List",
        path: "/Updates/update-list",
      });
    })
    .catch((err) => console.log(err));
};

const editBlog = (req, res, next) => {
  const id = req.params.id;
  Updates.findById(id)
    .then((update) => {
      if (!update) {
        console.log("no update found");
        return res.redirect("/");
      }
      res.render("./pages/Updates/editUpdate", {
        update: update,
      });
    })
    .catch((err) => console.log(err));
};

const deleteBlog = (req, res, next) => {
  res.render("./pages/Updates/deleteBlog");
};

const postAddUpdate = (req, res) => {
  const heading = req.body.heading;
  const author = req.body.author;
  const date = new Date();
  const desc = req.body.desc;

  const uploads = req.files;
  const media = uploads[0].filename;

  // for (let i = 0; i < uploads.length; i++) {
  //     media.push(uploads[i].filename)
  // }

  const update = new Updates({
    heading: heading,
    author: author,
    date: date,
    media: media,
    description: desc,
  });

  update
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Added update");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postEditUpdate = (req, res) => {
  const id = req.body.id;
  const heading = req.body.heading;
  const author = req.body.author;
  const date = new Date();
  const oldImage = req.body.oldImage;
  let media;
  const desc = req.body.desc;

  const uploads = req.files;
  if (uploads.length === 0) {
    media = oldImage;
  } else {
    delImg(oldImage);
    media = uploads[0].filename;
  }

  Updates.findById(id)
    .then((update) => {
      update.heading = heading;
      update.author = author;
      update.date = date;
      update.media = media;
      update.description = desc;
      return update.save();
    })
    .then((result) => {
      console.log("Updated updates");
      res.redirect("/Updates/updateList");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDeleteUpdate = async (req, res) => {
  const updateId = req.body.id;
  try {
    const update = await Updates.findById(updateId);
    await Updates.findByIdAndDelete(updateId);
    const mediaFile = update.media;
    delImg(mediaFile);
    console.log("update deleted");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

// Tours Plans & Hiking
const addTour = async (req, res, next) => {
  try {
    const hotels = await Hotels.find();
    const areas = await Areas.find();
    res.render("./pages/Tours/addTours", {
      areas: areas,
      hotels: hotels,
      pageTitle: "Add tour",
      path: "/Tours/tour-list",
    });
  } catch (err) {
    console.log(err);
  }
};

const tourList = (req, res, next) => {
  Tours.find()
    .then((tours) => {
      res.render("./pages/Tours/toursList", {
        tours: tours,
        pageTitle: "Tours List",
        path: "/Tours/tour-list",
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const viewTour = (req, res, next) => {
  const tourId = req.params.id;
  Tours.findById(tourId)
    .then((tour) => {
      if (!tour) {
        return res.redirect("/");
      }
      res.render("./pages/Tours/viewTour", {
        pageTitle: "View Tour",
        path: "/tours/tour",
        tour: tour,
      });
    })
    .catch((err) => console.log(err));
};

const editTour = async (req, res, next) => {
  try {
    const areas = await Areas.find();
    const hotels = await Hotels.find();
    const tourId = req.params.id;
    Tours.findById(tourId).then((tour) => {
      res.render("./pages/Tours/editTour", {
        pageTitle: "Edit Tour",
        path: "/admin/edit-tour",
        tour: tour,
        areas: areas,
        hotels: hotels,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const postAddTour = (req, res) => {
  const tourType = req.body.tourType;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const fromPlace = JSON.parse(req.body.fromPlace);
  const toPlace = JSON.parse(req.body.toPlace);
  const pickupLoc = JSON.parse(req.body.pickupLoc);
  const dropoffLoc = JSON.parse(req.body.dropoffLoc);
  const stayHotel = JSON.parse(req.body.stayHotel);
  const days = req.body.days;
  const nights = req.body.nights;
  const availableSeats = req.body.seats;
  const chargesPerHead = req.body.charges;
  const description = req.body.desc;
  const videoUrl = req.body.videoUrl;
  const tour = new Tours({
    tourType: tourType,
    startDate: startDate,
    endDate: endDate,
    fromPlace: fromPlace.areaName,
    toPlace: toPlace.areaName,
    pickupLocation: pickupLoc.areaName,
    dropoffLocation: dropoffLoc.areaName,
    stayHotel: stayHotel.hotelName,
    days: days,
    nights: nights,
    availableSeats: availableSeats,
    chargesPerHead: chargesPerHead,
    description: description,
    videoUrl: videoUrl,
  });
  tour
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Added Tour");
      req.flash("message", "Tour Added Successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postEditTour = (req, res, next) => {
  const tourId = req.body.tourId;
  const tourType = req.body.tourType;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const fromPlace = JSON.parse(req.body.fromPlace);
  const toPlace = JSON.parse(req.body.toPlace);
  const pickupLoc = JSON.parse(req.body.pickupLoc);
  const dropoffLoc = JSON.parse(req.body.dropoffLoc);
  const stayHotel = JSON.parse(req.body.stayHotel);
  const days = req.body.days;
  const nights = req.body.nights;
  const availableSeats = req.body.seats;
  const chargesPerHead = req.body.charges;
  const description = req.body.desc;
  const videoUrl = req.body.videoUrl;

  Tours.findById(tourId)
    .then((tour) => {
      tour.tourType = tourType;
      tour.startDate = startDate;
      tour.endDate = endDate;
      tour.fromPlace = fromPlace.areaName;
      tour.toPlace = toPlace.areaName;
      tour.pickupLocation = pickupLoc.areaName;
      tour.dropoffLocation = dropoffLoc.areaName;
      tour.stayHotel = stayHotel.hotelName;
      tour.days = days;
      tour.nights = nights;
      tour.availableSeats = availableSeats;
      tour.chargesPerHead = chargesPerHead;
      tour.description = description;
      tour.videoUrl = videoUrl;
      return tour.save();
    })
    .then((result) => {
      console.log("UPDATED Tour!");
      req.flash("message", "Tour Data Updated Successfully");
      res.redirect("/Tours/toursList");
    })
    .catch((err) => console.log(err));
};

const postDeleteTour = (req, res) => {
  const tourId = req.body.id;
  Tours.findByIdAndDelete(tourId)
    .then((result) => {
      console.log("Tours deleted");
      res.sendStatus(200);
    })
    .catch((err) => res.sendStatus(204));
};

// Bundles and Offers
const addBundle = (req, res, next) => {
  res.render("./pages/BundleOffers/addBundle");
};

const bundleList = (req, res, next) => {
  res.render("./pages/BundleOffers/bundlesList");
};

// Slider Images
const addImagesSlider = (req, res, next) => {
  const galleryId = req.params.id;
  res.render("./pages/SliderImages/addSliderImages", { galleryId: galleryId });
};

const sliderImages = (req, res, next) => {
  sliderGallery
    .findOne()
    .then((gallery) => {
      if (!gallery) {
        res.redirect("/SliderImages/addSliderImages/none");
      }
      res.render("./pages/SliderImages/sliderImagesList", {
        gallery: gallery,
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const postAddSliderImages = async (req, res) => {
  const uploads = req.files;
  const galleryId = req.body.galleryId;
  const sliderImages = [];

  for (let i = 0; i < uploads.length; i++) {
    sliderImages.push(uploads[i].filename);
  }

  const filter = { id: galleryId };
  const update = { $push: { images: sliderImages } };

  const existingGallery = await sliderGallery.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (existingGallery) {
    console.log("the gallery updated");
    req.flash("message", "Slider Gallery Updated Successfully");
    res.redirect("/SliderImages/sliderImagesList");
  } else {
    const gallery = new sliderGallery({
      images: sliderImages,
    });
    gallery
      .save()
      .then((result) => {
        // console.log(result);
        console.log("Created Gallery");
        req.flash("message", "Slider Gallery Added Successfully");
        res.redirect("/SliderImages/sliderImagesList");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const postDeleteSliderGalleryImage = (req, res) => {
  const galleryId = req.body.id;
  const image = req.body.image;
  let images = [];
  sliderGallery
    .findById(galleryId)
    .then((gallery) => {
      images = gallery.images;
      images.splice(images.indexOf(image), 1);
      if (images.length === 0) {
        return sliderGallery.findByIdAndDelete(galleryId);
      } else {
        return gallery.save();
      }
    })
    .then((result) => {
      delImg(image);
      console.log("UPDATED Slider Gallery!");
      if (images.length === 0) {
        res.redirect("/");
      } else {
        res.redirect("/SliderImages/sliderImagesList");
      }
    })
    .catch((err) => console.log(err));
};

// Customer Feedback
const feedback = (req, res, next) => {
  res.render("./pages/Feedback/customerFeedback");
};

const viewFeedbackQuery = (req, res, next) => {
  res.render("./pages/Feedback/viewFeedbackQuery");
};

// Users
const addUser = (req, res, next) => {
  Areas.find()
    .then((areas) => {
      res.render("./pages/Users/addUser", {
        areas: areas,
        oldInput: {
          name: "",
          contact: "",
          CNIC: "",
          gender: "",
          location: "",
          address: "",
          type: "",
          email: "",
          password: "",
        },
        flashMessage: req.flash("message"),
      });
    })
    .catch((err) => console.log(err));
};

const userList = (req, res, next) => {
  Users.find()
    .then((users) => {
      res.render("./pages/Users/usersList", {
        users: users,
        pageTitle: "Users List",
        path: "/Users/users-list",
      });
    })
    .catch((err) => console.log(err));
};

const editUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const areas = await Areas.find();
    const user = await Users.findById(userId);
    res.render("./pages/Users/editUser", {
      user: user,
      areas: areas,
      pageTitle: "Edit User",
      path: "/Users/edit-user",
      flashMessage: req.flash("message"),
    });
  } catch (err) {
    console.log(err);
  }
};

const postAddUser = async (req, res) => {
  const name = req.body.name;
  const contact = req.body.contact;
  const cnic = req.body.cnic;
  const gender = req.body.gender;
  const location = JSON.parse(req.body.location);
  const address = req.body.address;
  const type = req.body.type;
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const areas = await Areas.find();
    return res.status(422).render("../views/pages/Users/addUser", {
      path: "/Users/addUser",
      pageTitle: "Add User",
      flashMessage: errors.array()[0].msg,
      areas: areas,
      oldInput: {
        name: name,
        contact: contact,
        CNIC: cnic,
        gender: gender,
        location: location.name,
        address: address,
        type: type,
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(16);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new Users({
    name: name,
    contact: contact,
    CNIC: cnic,
    gender: gender,
    location: location.name,
    address: address,
    type: type,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
    console.log("Added user");
    req.flash("message", "User Added Successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const postEditUser = async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const contact = req.body.contact;
  const cnic = req.body.cnic;
  const gender = req.body.gender;
  const location = JSON.parse(req.body.location);
  const address = req.body.address;
  const type = req.body.type;
  const email = req.body.email;
  const password = req.body.password;
  const oldPassword = req.body.oldPassword;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const areas = await Areas.find();
    return res.status(422).render("../views/pages/Users/editUser", {
      path: "/Users/addUser",
      pageTitle: "Add User",
      flashMessage: errors.array()[0].msg,
      areas: areas,
      user: {
        id: userId,
        name: name,
        contact: contact,
        CNIC: cnic,
        gender: gender,
        location: location.name,
        address: address,
        type: type,
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  let salt=null;
  let hashedPassword=null;
  if (password.length > 0) {

    // generate salt to hash password
    salt = await bcrypt.genSalt(5);
    // now we set user password to hashed password
    hashedPassword = await bcrypt.hash(password, salt);

  }else{

    hashedPassword = oldPassword;

  }

  try {
    const user = await Users.findById(userId);
    user.name = name;
    user.contact = contact;
    user.CNIC = cnic;
    user.gender = gender;
    user.location = location.areaName;
    user.address = address;
    user.type = type;
    user.email = email;
    user.password = hashedPassword;
    await user.save();
    console.log("UPDATED User!");
    req.flash("message", "User Updated Successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const postDeleteUser = (req, res) => {
  const userId = req.body.id;
  Users.findByIdAndDelete(userId)
    .then(() => {
      console.log("Deleted user");
      res.sendStatus(200);
    })
    .catch((err) => res.sendStatus(204));
};

module.exports = {
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
};
