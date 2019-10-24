const productDb = require('../data-access/product-db');
const driverDb = require('../data-access/driver-db');
const orderDb = require('../data-access/order-db');

let productController= module.exports = {};

productController.index = async(req,res,next)=>{
        const prodList = await productDb.listProducts();
        res.status(200).send({
                title: 'List of products',
                list : prodList
            });
};
productController.userProducts = async(req,res,next)=>{
        const orderObj = await orderDb.findOrder("userId",req.userData.userId);        
        const prodListForUser = await productDb.findProductsBy("order._id",orderObj.id);
        res.status(200).send({
            list : prodListForUser,
            message: 'List of products'
        });
};

productController.sendOrder = async (req,res)=>{
        let orderObj = await orderDb.findAndUpdateOrder("userId",req.userData.userId,{
          location: req.body.location,
          date  : req.body.date,
          contactInformation : req.body.contactInformation
        });
        
        if(!orderObj){
            orderObj = await orderDb.addOrder({
                    userId  : req.userData.userId,
                    location: req.body.location,
                    date    : req.body.date,
                    contactInformation :req.body.contactInformation
                });     
        }
        const chosenProduct = await productDb.findProduct("id",req.params.id);
        if(!chosenProduct || chosenProduct === null) throw new Error('not found product!!');        
        const order = await orderDb.addProductToOrder(chosenProduct,orderObj);  
              
        if(!order || order === null) throw new Error('product not Added to an Order');        
        const chosenDriver = await driverDb.giveOrderToDriver(order);
        res.send(chosenDriver);
}


productController.create = async (req, res, next )=>{
        const productExsits = await productDb.findProduct("name",req.body.name);
        if(productExsits) throw new Error("Product Already exists!");
        const createdProduct = await productDb.addProduct(req.body);
        res.send(createdProduct);
};

productController.update = async (req, res, next )=>{
        const  productId = req.params.id;
        const updatedProduct = await productDb.updateProduct(productId,req.body);
        if(!updatedProduct) throw new Error("Updating operation has been faild... cause:");// try to handle errors by pages
        res.send({
                updatedProduct,
                title: 'product has been updated successfully.'
        } );
};

productController.remove = async (req, res ,next)=>{
        const productId = req.params.id;
        const result = await productDb.deleteProduct(productId);        
        if(!result) throw new Error('Product is not Found & deleted...');
        res.status(200).send({
                result ,
                title :' product has been deleted successfully'});
}