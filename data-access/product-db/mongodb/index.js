const productModel = require('../../../db/mongodb/product').model;
const makeProduct = require('../../../models/Product/index'); 
const serialize = require('./serializer'); 

//-------------- API logic -----------------------------------------------------------------
const listProducts = async() => {
  return  serialize(await productModel.find());
}

let findProduct = async(prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  const productList = await productModel.find({[prop]:val});
  return serialize(productList[0]);
}

let findProductsBy = async(prop, val) => {
  const productList = await productModel.find({[prop]: val});
  return serialize(productList);
}

let addProduct = async(ProductInfo) => {
  let Product = makeProduct(ProductInfo);  
  let validProduct = {
    name: Product.getName(),
    description: Product.getDescription(),
    price: Product.getPrice(),
    category: Product.getCategory()
  };

  const product = await productModel.create(validProduct);
  return serialize(product);

}

let updateProduct = async(id,ProductInfo) => {
  const Product = makeProduct(ProductInfo);
  let validProduct = {
    name: Product.getName(),
    description: Product.getDescription(),
    price: Product.getPrice(),
    category: Product.getCategory()
  };
    const updatedProduct = await productModel.findByIdAndUpdate(id,{
      $set : validProduct
    },{new: true});
    return serialize(updatedProduct);
}

let deleteProduct = async(id) => {
    const result = await productModel.findByIdAndDelete(id);
    return result;
}

let dropAll = () => {
  return productModel.remove()
}
//-------------- API logic -----------------------------------------------------------------

module.exports = {
  listProducts,
  findProduct,
  findProductsBy,
  addProduct,
  updateProduct,
  deleteProduct,
  dropAll
}
