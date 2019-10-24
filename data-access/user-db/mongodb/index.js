const userModel = require('../../../db/mongodb/user');
const userFactory = require('../../../models/user/index'); 
const makeLoggedInUser = userFactory.makeLoggedInUser;
const makeUser = userFactory.makeUser;
const serialize = require('./serializer');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

//------------- Authentication Logic-------------------------------------------------------
let authenticateUser = async(userInfo) => {
  const loggedInUser = makeLoggedInUser(userInfo);
  const validUser = { email:loggedInUser.getEmail(), password: loggedInUser.getPassword()};
  const user = await findUser('email',validUser.email);
  if(!user) throw new Error('Auth faild... User not found!');
  const result = await bcrypt.compare(userInfo.password, user.password);
  if(result){    
      // save the user info into jwt      
    const token = await jwt.sign({email: user.email, userId: user.id}, config.get('JWT_KEY'), {
      expiresIn: '1h'
      });      
      return token
  }
  else{
    throw new Error('invalid user...Authentication faild');
  }
}

let signUpUser = async(userInfo) => {
  const User = makeUser(userInfo);
  const validUser = {
    firstName: User.getFirstName(),
    lastName: User.getLastName(),
    email: User.getEmail(),
    password: User.getPassword(),
    gender: User.getGender(),
    birthday: User.getBirthday(),
    address: {
      street : User.getAddress().getStreet(),
      country: User.getAddress().getCountry(),
      city   : User.getAddress().getCity(),
      state  : User.getAddress().getState(),
      zipCode: User.getAddress().getZipCode()
    },
  };
  const hashedPass = await bcrypt.hash(validUser.password,await bcrypt.genSalt(10));
  validUser.password = hashedPass;
  const user = await userModel.create(validUser);
  const token = jwt.sign({email: user.email,userId: user._id}, config.get('JWT_KEY'), {
  expiresIn: '1h'
  });
  return { createdUser :serialize(user) , token}
}
//------------- Authentication Logic-------------------------------------------------------

//-------------- API logic -----------------------------------------------------------------
const listUsers = async() => {
  return serialize(await userModel.find());
}


let findUser = async(prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  const userList = await userModel.find({[prop]: val});  
  return serialize(userList[0]);
}

let findUsersBy = async(prop, val) => {
  const userList = await userModel.find({[prop]: val});
  return serialize(userList);
}
let addUser = async(userInfo) => {
  const User = makeUser(userInfo);
  const validUser = {
    firstName: User.getFirstName(),
    lastName: User.getLastName(),
    email: User.getEmail(),
    password: User.getPassword(),
    gender: User.getGender(),
    birthday: User.getBirthday(),
    address: {
      street : User.getAddress().getStreet(),
      country: User.getAddress().getCountry(),
      city   : User.getAddress().getCity(),
      state  : User.getAddress().getState(),
      zipCode: User.getAddress().getZipCode()
    },
  };
  const user = await userModel.create(validUser);
  return serialize(user);
}

let updateUser = async(id,userInfo) => {
  const User = makeUser(userInfo);
  const validUser = {
    firstName: User.getFirstName(),
    lastName: User.getLastName(),
    email: User.getEmail(),
    password: User.getPassword(),
    gender: User.getGender(),
    birthday: User.getBirthday(),
    address: {
      street : User.getAddress().getStreet(),
      country: User.getAddress().getCountry(),
      city   : User.getAddress().getCity(),
      state  : User.getAddress().getState(),
      zipCode: User.getAddress().getZipCode()
    }
  };
  const updatedUser = await userModel.findByIdAndUpdate(id,validUser,{new: true});
  return serialize(updatedUser);
}

let deleteUser = async(id) => {
    const result = await userModel.findByIdAndDelete(id);
    return result;
}

let dropAll = () => {
  return userModel.remove()
}
//-------------- API logic -----------------------------------------------------------------


module.exports = {
  listUsers,
  findUser,
  findUsersBy,
  authenticateUser,
  signUpUser,
  addUser,
  updateUser,
  deleteUser,
  dropAll
};