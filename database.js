const mongoose = require('mongoose');
const mongoURL='mongodb://127.0.0.1:27017/transport'
//const mongoURL ='mongodb+srv://debashishbndm14:debashishtiu14@cluster0.iuirygo.mongodb.net/'

mongoose.connect(mongoURL, {
});

const db =mongoose.connection;

db.on('connected',()=>{
  console.log('connected to MongoDB server');
});
db.on('error',(err)=> {
  console.error('mongoDB connection error :',err);
});
db.on('disconnected',()=> {
  console.log('MongoDB disconnected');
});
module.exports=db;