const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotels',
        required: true
    },
    images: {
        type:  [String],
        required: true
    }
});


module.exports = mongoose.model('AppartmentGallery', GallerySchema);