const userDb = require('../data-access/user-db');

let userController= module.exports = {};

userController.loggingIn = async (req , res ) => {
    const token = await userDb.authenticateUser(req.body);
    res.header('Authorization', 'Bearer ' + token).status(200).json({
    message : 'Auth Success',
    token
    });
    }

userController.signUp = async (req, res)=> {
    const user =  await userDb.findUser('email' , req.body.email);
    if (user) { res.status(409 ).send('Email Already exists in DB try another one'); return; }
    const result = await userDb.signUpUser(req.body);
    res.header('Authorization', 'Bearer ' + result.token).send(await result.createdUser);
} 

userController.loggingOut = async (req, res)=> {
    res.send("logged Out");
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
}

userController.index = async(req,res)=>{
    const userList = await userDb.listUsers();
    res.status(200).send({
        list : userList,
        message: 'List of Users'
    });
};
userController.create = async (req, res )=>{
    const userExsits = await userDb.findUser("email",req.body.email);    
    if(userExsits) throw new Error("User Already exists!");// try to handle errors by pages
    const user = await userDb.addUser(req.body);
    res.send(user);
};

userController.update = async (req, res, next )=>{
    const  userId = req.params.id;
    const updatedUser = await userDb.updateUser(userId,req.body);
    if(!updatedUser) throw new Error("Updating operation has been faild...");
    res.send(updatedUser);
};

userController.remove = async (req, res ,next)=>{
    const userId = req.params.id;
    const result = await userDb.deleteUser(userId);
    if(!result) throw new Error('User is not Found & deleted...');
    res.status(200).send({
        result ,
        title :' product has been deleted successfully'
    });
}