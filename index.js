const express=require('express');
const fs=require('fs');
const urlRouter=require('./routes/url')
const mongoose=require('mongoose');
const {connectToMongoDb}=require('./connection')

const  app = express();
const PORT=9999;

connectToMongoDb('mongodb://localhost:27017/url-shortener').then(()=>console.log('MogoDB connected'));

app.use(express.json());
app.use('/url',urlRouter);

app.listen(PORT,()=>console.log( `Listening on ${PORT}`));