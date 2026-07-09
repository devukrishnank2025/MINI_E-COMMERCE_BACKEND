const express = require("express");
const adminRoute= express()
const upload = require("../Multer/multer");
const { saveProduct } = require("../Controllers/ProductController");

adminRoute.post('/', upload.single("image"),saveProduct)
adminRoute.get('/',()=>{
    console.log('i got request in the admin route get');
    
})

module.exports=adminRoute;