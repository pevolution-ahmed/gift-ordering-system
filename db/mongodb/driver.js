
const mongoose = require('mongoose');
const orderModel = require('./order');
  const driverSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxlength : 150},
    lastName : { type: String, required: true, maxlength : 150},
    vehicle  : { type: String, required: true, maxlength : 150},
    orders   : { type: [orderModel.schema], required: true, default : []}
  });
module.exports = mongoose.model('Driver', driverSchema);