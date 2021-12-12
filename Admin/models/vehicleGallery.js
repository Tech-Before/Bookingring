const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicles',
        required: true
    },
    images: {
        type:  [String],
        required: true
    }
});


module.exports = mongoose.model('VehicleGallery', GallerySchema);