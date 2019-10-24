const mongoose = require('mongoose');
const productSchema = require('./product').schema;
const orderSchema = new mongoose.Schema({
    userId      : { type : mongoose.Schema.Types.ObjectId , ref: 'User', required : true},
    quantity  : { type : Number, required : true, min : 0, max : 50,default:0},
    date      : { type : Date  , required : true, default:Date.now()},
    totalPrice: { type : Number, required : true, default:0},
    location  : { type : String, required : true, maxlength: 150},
    contactInformation  : { type : String, required : true, maxlength: 250},
    products  : { type : [productSchema] , required : true}
  });
  module.exports = {
    model : mongoose.model('Order',orderSchema),
    schema : orderSchema
  }
