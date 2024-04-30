const express=require('express');
const path=require('path')
const {pathCheck}=require('./middlewares/path')
const fs=require('fs');
const urlRouter=require('./routes/url')
const staticRouter=require('./routes/staticRouter')
const mongoose=require('mongoose');
const {connectToMongoDb}=require('./connection')

const  app = express();
const PORT=9999;

connectToMongoDb('mongodb://localhost:27017/url-shortener').then(()=>console.log('MogoDB connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(pathCheck())

app.use('/url',urlRouter);
app.use('/',staticRouter);

app.listen(PORT,()=>console.log( `Listening on ${PORT}`));