const express=require('express')
const url=require("../models/url")

const router=express.Router();



router.get('/',async (req,res)=>{
    const urlList= await url.find({})
    const data={urls:urlList}
    return res.render('home',{data});
})

module.exports=router;