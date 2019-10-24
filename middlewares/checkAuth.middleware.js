const jwt  = require('jsonwebtoken');
const config  = require('config');

const checkAuth = (req , res , next) => {
  if(!req.headers.authorization){res.status(401).send('Access denied.. No Authorization header'); return;}
  const token = req.headers.authorization.split(" ")[1];

  if(!token) { return res.status(401).send('Access denied.. No token provided');}
  try {
    const decoded = jwt.verify(token, config.get('JWT_KEY'));    
    req.userData = decoded;
    next();
  } catch (error) {
      return res.status(401).json({
      message : 'Authentication failed'+ error
    });
  }

}
module.exports = checkAuth;
