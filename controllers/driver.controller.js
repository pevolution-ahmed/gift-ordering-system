const driverDb = require('../data-access/driver-db');

let driverController= module.exports = {};

driverController.index = async(req,res,next)=>{
    const driverList = await driverDb.listDrivers();
    res.status(200).send({
        list : driverList,
        message: 'List of Drivers'
    });
};

driverController.create = async (req, res, next )=>{
    const driverExsits = await driverDb.findDriver("firstName",req.body.firstName);
    if(driverExsits) throw new Error("driver Already exists!");// try to handle errors by pages
    const s = await driverDb.addDriver(req.body);
    res.send(s);
};

driverController.update = async (req, res, next )=>{
    const  driverId = req.params.id;
    const updatedDriver = await driverDb.updateDriver(driverId,req.body);
    if(!updatedDriver) throw new Error("Updating operation has been faild...:");// try to handle errors by pages
    res.send({
        updatedDriver,
        title: 'driver has been updated successfully.'
    });
};

driverController.remove = async (req, res ,next)=>{
    const driverId = req.params.id;
    const result = await driverDb.deleteDriver(driverId);
    if(!result) throw new Error('driver is not deleted...');
    res.status(200).send({
        result ,
        title :' driver has been deleted successfully'});
}