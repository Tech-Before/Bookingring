const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomsSchema = new Schema({
    roomNo: {
        type: Number,
        required: true
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotels',
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    areaId: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
        required: true
    },
    areaName: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    hotWater: {
        type: Boolean,
        required: true
    },
    balcony: {
        type: Boolean,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    charges: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    occupency: {
        type: String,
        required: true
    },
    bedSize: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Rooms', RoomsSchema);
