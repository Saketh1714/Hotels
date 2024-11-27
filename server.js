// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user.username);
// fs.appendFile('g.txt','hi\t'+user.username+'!\n',()=>{
//     console.log("file is appended:")
// });

const express = require('express');
const app = express()
const db=require('./db');
require('dotenv').config();
const PORT=process.env.PORT || 3000;


const bodyParser=require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Welcome to the hotel saki! We are loved to serve you...')
});


const personroutes=require('./routes/personRoutes');
app.use('/person',personroutes);

const menuroutes=require('./routes/menuRoutes');
app.use('/menu',menuroutes);


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
  });
   
  



