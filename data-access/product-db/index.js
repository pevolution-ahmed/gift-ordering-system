let {
    listProducts,
    findProduct,
    findProductsBy,
    addProduct,
    updateProduct,
    deleteProduct,
    dropAll
} = require('./mongodb/index') // switch out db as you want 


  
  
  let ProductsDb = {
    listProducts,
    findProduct,
    findProductsBy,
    addProduct,
    updateProduct,
    deleteProduct,
    dropAll
  }
  
  module.exports = ProductsDb
  