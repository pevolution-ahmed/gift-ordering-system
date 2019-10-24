module.exports = function buildMakeorder(orderValidator){
    return ({
        userId ,
        quantity = 0, 
        date   = Date.now()  , 
        totalPrice = 0,
        location = " ",
        contactInformation,
        products = []
    }={})=>{
        userId = userId+"";        
        let {error} = orderValidator({
            
            userId,
            quantity , 
            date     ,
            totalPrice,
            location,
            contactInformation,
            products
            });
            
        if(error) throw new Error(error);
        
        return Object.freeze({
            getUserId : ()=> userId,
            getQuantity : () => quantity,
            getDate : () => date,
            getTotalPrice : () => totalPrice,
            getLocation   : () => location,
            getContactInfo: () => contactInformation,
            getProducts   : ()=> products
        });
    }
}