const express=require('express')
const url=require("../models/url");
const { restrictTo } = require('../middlewares/loginAuth');

const router=express.Router();

router.get('/admin/urls', restrictTo(['ADMIN']),async(req,res)=>{
    const urlList=await url.find({});
    return res.render('home',{urls:urlList});
})

router.get('/',restrictTo(['NORMAL','ADMIN']), async (req,res)=>{
    if(!req.user) res.redirect('/login')
    console.log(req.user);
    const urlList= await url.find({createdBy:req.user._id})
    return res.render('home',{urls:urlList});
})

router.get('/register',(req,res)=> {
    return  res.render("register");
 });

 router.get('/login',(req,res)=> {
    return  res.render("login");
 });

module.exports=router;