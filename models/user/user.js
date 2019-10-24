/* Factory pattern
 Using factory function to create a validation model for our entities
 in the system using joi as a validator for each entity schema
*/
function buildMakeUser(userValidator,makeAddress){
    return ({
        firstName,
        lastName,
        email,
        password ,
        birthday,
        gender,
        address 
    }={})=>{
        let {error} = userValidator({firstName,lastName,email,password ,birthday,gender,address });        
       if (error) {
        throw new Error(error);
       }
       const validAddress = makeAddress(address);
        return Object.freeze({
            getFirstName : ()=> firstName,
            getLastName : ()=> lastName,
            getEmail : () => email,
            getPassword : () => password,
            getBirthday : () => birthday,
            getGender: () => gender,
            getAddress  : () => validAddress
        });
    }
}
function buildMakeLoggedInUser(loggedInUserValidator){
    return ({
        email,
        password 
    }={})=>{
        let {error} = loggedInUserValidator({email,password});        
       if (error) {
        throw new Error(error);
       }
        return Object.freeze({
            getEmail : () => email,
            getPassword : () => password
        });
    }
}
module.exports = { buildMakeUser, buildMakeLoggedInUser};
