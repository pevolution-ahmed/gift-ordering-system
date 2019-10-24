let {
    listUsers,
    findUser,
    findUsersBy,
    authenticateUser,
    signUpUser,
    addUser,
    updateUser,
    deleteUser,
    dropAll
} = require('./mongodb/index') // switch out db as you want 


  
  
  let usersDb = {
    listUsers,
    findUser,
    findUsersBy,
    authenticateUser,
    signUpUser,
    addUser,
    updateUser,
    deleteUser,
    dropAll
  }
  
  module.exports = usersDb
  