const AreasModel = require('./locationsModel');
const HotelsModel = require('./hotelsModel');
const AppartmentsModel = require('./appartmentsModel');
const VehiclesModel = require('./vehiclesModel');
module.exports = {
    fetchAreas: ()=>{
        return AreasModel.fetchAreas();
    }
  };
