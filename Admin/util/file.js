const fs = require('fs');
const path = require('path');

const delImg = (name) => {
  imgPath = path.join(__dirname, "../public/uploads/" + name);
  fs.unlink(imgPath, function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
};

const delMultImages = (names) => {
  const imgDirectory = path.join(__dirname, "../public/uploads/");
  names.map((name) => {
    imgPath = imgDirectory + name;
    fs.unlink(imgPath, function (err) {
      if (err) throw err;
      console.log("attaced files deleted!");
    });
  });
};

module.exports = {
    delImg,
    delMultImages
 }