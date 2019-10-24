let {
    listOrders,
    findOrder,
    findOrdersBy,
    addProductToOrder,
    findAndUpdateOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    dropAll
} = require('./mongodb/index') // switch out db as you want 


  
  
  let OrdersDb = {
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
  
  module.exports = OrdersDb
  