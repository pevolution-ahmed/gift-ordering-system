/* Factory pattern
 Using factory function to create a validation model for our entities
 in the systems using joi as a validator for each entity schema
*/
module.exports =  function buildMakeAddress(addressValidator){
    
    return ({
        street,
        country,
        city,
        state ,
        zipCode 
    }={})=>{
        let {error} = addressValidator({ street,country,city,state ,zipCode });        
       if (error) {
        throw new Error(error);
       }
        return Object.freeze({
            getStreet : ()=> street,
            getCountry : () => country,
            getCity : () => city,
            getState : () => state,
            getZipCode : () => zipCode
        });
    }
}