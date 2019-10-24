const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const hbs = require('express-handlebars')
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const driverRouter = require('./routes/driver');
const authRouter = require('./routes/users');
const config = require('config');
const mongoose = require('mongoose');
const app = express();

if(!config.get('JWT_KEY')){
  console.error('FATAL ERROR JWT private key is not defined');
  process.exit(1);
}
//------------------ View engine setup --------------------------------------------------------------------
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout', layoutDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//----------------------------------------------------------------------------------------------------------

//---------------- Middlewares -----------------------------------------------------------------------------
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//-----------------------------------------------------------------------------------------------------------

// --------- listening to port 3000-----------------------------------------------
const port = process.env.port || 3000;
app.listen(port, () => {  console.log('Express server listening on port '+port) });
//--------------------------------------------------------------------------------

//-------------- Mongoose ODM Configuration---------------------------------------------------------------------------------------
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const mongoURI = `mongodb://${config.get('DBUser')}:${config.get('DBPassword')}@ds335678.mlab.com:35678/${config.get('DBName')}`;
mongoose.connect(mongoURI,{useNewUrlParser:true , useUnifiedTopology : true})
    .then(()=>{
      console.log('Database Connected Succssesfully...');
    })
    .catch((err)=>{
      console.log(err);
    });
//----------------------------------------------------------------------------------------------------------------------------------

// ----------- Authentication & API Routes -----------------------------------------------------
app.use('/api/',productRouter);
app.use('/api/',orderRouter);
app.use('/api/',driverRouter);
app.use('/auth/',authRouter);
//--------------------------------------------------------------------------

// ------------------ Error Handler Middleware -----------------------------
app.use((err,req , res  ,next) =>{
      res.status(500).send('Somthing failed in the server ' + err.stack);
});
//--------------------------------------------------------------------------
module.exports = app;




/* 
------------ Uploading image to the Db by multer  ( works but still not exactly right )--------------------- 
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
const conn =  mongoose.createConnection(mongoURI,{useNewUrlParser:true , useUnifiedTopology : true});
conn.once('open',()=>{
// init stream
  let gfs = Grid(conn.db,mongoose.mongo);
  gfs.collection('uploads');

}).then(()=>{
        console.log('Database Connected Succssesfully...');
      })
      .catch((err)=>{
        console.log(err);
      });
// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const uploads = multer({ storage });
app.post('/uploads',uploads.single('img'),(req,res)=>{
  res.json(req.file);
});
-------------------------------------------------------------------------------------------
*/
