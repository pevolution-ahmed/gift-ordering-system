const orderDb = require('../data-access/order-db');
let orderController= module.exports = {};

orderController.index = async(req,res)=>{
        const orderList = await orderDb.listOrders();
        res.status(200).send({
            list : orderList,
            message: 'List of orders'
        });
};
orderController.create = async (req, res )=>{
        const orderExsits = await orderDb.findOrder("userId",req.userData.userId);
        if(orderExsits) throw new Error("order already exists!");        
        const createdOrder = await orderDb.addOrder(req.body);
        res.send(createdOrder);
};

orderController.update = async (req, res, next )=>{
        const  orderId = req.params.id;
        const updatedOrder = await orderDb.findAndUpdateOrder('id',orderId,req.body);
        if(!updatedOrder) throw new Error("Updating operation has been faild...");// try to handle errors by pages
        res.send({
                updatedOrder,
                title: 'order has been updated successfully.'
        } );
};

orderController.remove = async (req, res ,next)=>{
        const orderId = req.params.id;
        const result = await orderDb.deleteOrder(orderId);        
        if(!result) throw new Error('order is not Found & deleted...');
        res.status(200).send({
                result ,
                title :' order has been deleted successfully'});
}