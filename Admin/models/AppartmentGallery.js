const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    appartmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Appartments',
        required: true
    },
    images: {
        type:  [String],
        required: true
    }
});


module.exports = mongoose.model('AppartmentGallery', GallerySchema);