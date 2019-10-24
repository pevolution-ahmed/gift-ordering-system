/* Factory pattern
 Using factory function to create a validation model for our entities
 in the systems using joi as a validator for each entity schema
*/
module.exports =  function buildMakeDriver(driverValidator){
    
    return ({
        firstName,
        lastName,
        orders ,
        vehicle,
    }={})=>{
        let {error} = driverValidator({firstName,lastName,vehicle,orders});        
       if (error) {
        throw new Error(error);
       }
        return Object.freeze({
            getFirstName : ()=> firstName,
            getLastName : ()=> lastName,
            getVehicle : ()=> vehicle,
            getOrders : () => orders,
        });
    }
}