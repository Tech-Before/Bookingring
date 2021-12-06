const fs = require('fs');
const path = require('path');
const delImg = (name)=>{
    imgPath = path.join(__dirname, '../public/images/' + name);
    fs.unlink(imgPath,function(err){
        if(err) throw err;
        console.log('File deleted!');
    });
}

module.exports = delImg;