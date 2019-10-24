let {
    listDrivers,
    findDriver,
    findDriversBy,
    addDriver,
    updateDriver,
    deleteDriver,
    dropAll,
    giveOrderToDriver
} = require('./mongodb/index') // switch out db as you want 


  
  
  let DriversDb = {
    listDrivers,
    findDriver,
    findDriversBy,
    addDriver,
    updateDriver,
    deleteDriver,
    dropAll,
    giveOrderToDriver
  }
  
  module.exports = DriversDb
  