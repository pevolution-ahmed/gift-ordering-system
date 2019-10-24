const orderModel = require('../../../db/mongodb/order').model;
const makeOrder = require('../../../models/Order/index'); 
const serialize = require('./serializer'); 
//------------------------ Business Logic -----------------------------------------------
let addProductToOrder = async (product , order) =>{
  
  const orderObj = await orderModel.findById(order.id);
  Object.defineProperty(product, "_id",Object.getOwnPropertyDescriptor(product, "id"));
  delete product["id"];
  const exists = orderObj.products.find((productElement)=>{
    console.log('is '+productElement._id+' === ' +product._id );
    console.log(String(productElement._id) === String(product._id));
    return String(productElement._id) === String(product._id);
  });
  if(typeof(exists)=== 'undefined'){     
    orderObj.products.push(product);    
    orderObj.quantity++;
    orderObj.totalPrice+= product.price;
    orderObj.save();
    return serialize(orderObj);
  }
  throw new Error('product is already exists in your order');
}
//------------------------ Business Logic -----------------------------------------------

//-------------- API logic -----------------------------------------------------------------
const listOrders = async() => {
  return  serialize(await orderModel.find());
}

let findOrder = async(prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  const orderList = await orderModel.find({[prop]:val});
  return serialize(orderList[0]);
}
let findAndUpdateOrder = async(prop, val,updatedVal) => {
  if (prop === 'id') {
    prop = '_id'
  }
  const updatedOrder = await orderModel.findOneAndUpdate({[prop]:val},updatedVal,{new:true });
  console.log(serialize(updatedOrder));
  return serialize(updatedOrder);
}

let findOrdersBy = async(prop, val) => {
  const orderList = await orderModel.find({[prop]: val});
  return serialize(orderList);
}

let addOrder = async(orderInfo) => {
  const Order = makeOrder(orderInfo);
  const validOrder = {
    userId:Order.getUserId(),
    quantity: Order.getQuantity(),
    date: Order.getDate(),
    totalPrice: Order.getTotalPrice(),
    location : Order.getLocation(),
    contactInformation : Order.getContactInfo(),
    products : Order.getProducts()
  };  

  const order = await orderModel.create(validOrder);
  return serialize(order);

}

let updateOrder = async(id,orderInfo) => {
  const Order = makeOrder(orderInfo);
  const validOrder = {
    userId:Order.getUserId(),
    quantity: Order.getQuantity(),
    date: Order.getDate(),
    totalPrice: Order.getTotalPrice(),
    location : Order.getLocation(),
    contactInformation : Order.getContactInfo(),
    products : Order.getProducts()
  };  
  try{
    const updatedOrder = await orderModel.findOneAndUpdate(id,{
      $set : validOrder
    },{new: true});
    return serialize(updatedOrder);
 }catch(err){
  throw new Error('Updating operation has been faild... cause'+ err);
 }
}

let deleteOrder = async(id) => {
    try {
      const result = await orderModel.findByIdAndDelete(id);
    if(!result) throw new Error('Order is not Found & deleted...');
    return { id : result._id,status : 'success'};
  } catch (error) {
        return { status : 'faild'+ error.message};
    }
}

let dropAll = async() => {
  return await orderModel.remove()
}
//-------------- API logic -----------------------------------------------------------------
module.exports = {
  listOrders,
  findOrder,
  findOrdersBy,
  findAndUpdateOrder,
  addProductToOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  dropAll
}

