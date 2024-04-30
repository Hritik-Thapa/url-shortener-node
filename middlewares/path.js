const express = require("express");

function pathCheck(){
    return (req,res,next)=>{
        console.log(`middleware ${req.path}`);
        next();
    }
}

module.exports={pathCheck}
