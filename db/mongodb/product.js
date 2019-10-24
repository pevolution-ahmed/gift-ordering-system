const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id  : mongoose.Schema.Types.ObjectId,
    name : {type : String ,required : true}
  });

const productSchema = new mongoose.Schema({
    name : { type: String, required : true, maxlength: 150},
    description : {type: String, required : true, maxlength: 250},
    // img: { data: Buffer, contentType: String },
    price: {
      type: Number,
      required : true,
      min : 5,
      validate:{
        validator : (value) =>{
          return value !== 0;
        },
        msg : 'price can\'t be zero'
      },
    },
    category   : {type : String ,required : true}
  });

  module.exports = {
    model : mongoose.model('Product',productSchema),
    schema: productSchema};