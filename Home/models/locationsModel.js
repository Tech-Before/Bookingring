const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationsSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const areas = mongoose.model('Locations', LocationsSchema);

module.exports = {
    fetchAreas: () => {
      return areas.find().limit(20);
    }
  };