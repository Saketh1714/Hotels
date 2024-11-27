const mongoose=require('mongoose');
require('dotenv').config();
// const mongooseUrl='mongodb://localhost:27017/sakirestaurnant';  ///-->this is local database server
const mongooseUrl=process.env.DB_URL;  ///-->cloud based server using env
mongoose.connect(mongooseUrl,{
    // useNewUrlparser:true,
    // useUnifiedTopology:true

});


const db=mongoose.connection;

db.on('connected',()=> {
    console.log('connected to mongodb sever');
});

db.on('error',(err)=> {
    console.error('error in connecting to db server',err);
});

db.on('disconnected',()=> {
    console.log('disconnected to mongodb server');
});

module.exports=db;