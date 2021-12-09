const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomsSchema = new Schema({
    roomNo: {
        type: Number,
        required: true
    },
    hotelId: {
        type: String,
        required: true
    },
    areaId: {
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
    roomService: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    charges: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Rooms', RoomsSchema);
