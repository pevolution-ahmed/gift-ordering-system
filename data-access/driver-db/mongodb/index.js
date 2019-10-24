const driverModel = require('../../../db/mongodb/driver');
const makeDriver = require('../../../models/driver/index'); 
const serialize = require('./serializer'); 
//------------------------ Business Logic -----------------------------------------------
const giveOrderToDriver = async(order) =>{
  const drivers = await listDrivers();
  if(drivers.length === 0) throw new Error('Driver Database is Empty!!');
  let counter ;
  const unbusyDrivers = await drivers.filter((driver)=>{
    counter = 0;
    driver.orders.forEach((orderElement)=>{
      if( new Date(orderElement.date).valueOf() === new Date(order.date ).valueOf()) counter++; //unbusyDrivers.push(driver);
    });    
    if(counter > 0 ) return false;
    else return true;
  });

  if(unbusyDrivers.length === 0 ){
    throw new Error("No drivers available...");
  }
   const chosenDriver = await driverModel.findById(unbusyDrivers[0].id);
   chosenDriver.orders.push(order);
   chosenDriver.save();
   return serialize(chosenDriver);
}
//------------------------ Business Logic -----------------------------------------------

//-------------- API logic -----------------------------------------------------------------

const listDrivers = async() => {
  return serialize(await driverModel.find());
}

const findDriver = async(prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  const driverList = await driverModel.find({[prop]:val});
  return serialize(driverList[0]);
}

const findDriversBy = async(prop, val) => {
  const driverList = await driverModel.find({[prop]: val});
  return serialize(driverList);
}

const addDriver = async(driverInfo) => {
  const Driver = makeDriver(driverInfo);
  const validDriver = {
    firstName: Driver.getFirstName(),
    lastName : Driver.getLastName(), 
    vehicle  : Driver.getVehicle(),
    orders: Driver.getOrders()
  };
  const driver = await driverModel.create(validDriver);
  return serialize(driver);
}

const updateDriver = async(id,driverInfo) => {
  const Driver = makeDriver(driverInfo);
  const validDriver = {
    firstName: Driver.getFirstName(),
    lastName : Driver.getLastName(), 
    vehicle  : Driver.getVehicle(),
    orders: Driver.getOrders(),
   
  };
    const updatedDriver = await driverModel.findByIdAndUpdate(id,validDriver,{new: true});
    return serialize(updatedDriver);
}

const deleteDriver = async(id) => {
    const result = await driverModel.findByIdAndDelete(id);
    return result;
}

const dropAll = async() => {
  return await driverModel.remove()
}
//-------------- API logic -----------------------------------------------------------------

module.exports = {
  listDrivers,
  findDriver,
  findDriversBy,
  addDriver,
  updateDriver,
  deleteDriver,
  dropAll,
  giveOrderToDriver

}

