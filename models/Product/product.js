/* Factory pattern
 Using factory function to create a validation model for our entities
 in the systems using joi as a validator for each entity schema
*/
module.exports =  function buildMakeProduct(productValidator){
    return ({
        name,
        description,
        price,
        category 
    }={})=>{
        let {error} = productValidator({name,description,price,category});        
       if (error) {
        throw new Error(error);
       }
        return Object.freeze({
            getName : ()=> name,
            getDescription : () => description,
            getPrice : () => price,
            getCategory : () => category
        });
    }
}