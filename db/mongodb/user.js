
const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxlength : 150},
    lastName : { type: String, required: true, maxlength : 150},
    email    : { type: String, required: true,
       match :/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      },
    password : {
      type      : String,
      required  : true,
      minlength : 8,
      maxlength : 150,
      // match     : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
      unique    : true
      },
    gender   : { type: String , enum: ['male' , 'female']},
    birthday: { type: Date , default : Date.now()},
    address  :  {
      street : {type : String , required : true},
      country: {type : String , required : true},
      city   : {type : String , required : true},
      state  : {type : String , required : true},
      zipCode: {type : Number , required : true}
    } ,  
  });
module.exports = mongoose.model('User', userSchema);