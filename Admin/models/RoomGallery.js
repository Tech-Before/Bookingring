const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Rooms',
        required: true
    },
    images: {
        type:  [String],
        required: true
    }
});


module.exports = mongoose.model('RoomGallery', GallerySchema);