const express=require('express');
const path=require('path');
const fs=require('fs');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');



const urlRoute=require('./routes/url')
const staticRoute=require('./routes/staticRouter')
const userRoute=require('./routes/user')


const {checkForAuthentication,restrictTo}=require('./middlewares/loginAuth')
const {connectToMongoDb}=require('./connection');

const  app = express();
const PORT=9999;

connectToMongoDb('mongodb://localhost:27017/url-shortener').then(()=>console.log('MogoDB connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(checkForAuthentication);


app.use('/url',restrictTo(['NORMAL','ADMIN']),urlRoute);
app.use('/user',userRoute)
app.use('/',staticRoute);

app.listen(PORT,()=>console.log( `Listening on ${PORT}`));