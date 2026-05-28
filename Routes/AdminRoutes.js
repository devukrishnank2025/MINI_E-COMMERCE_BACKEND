const express = require("express");
const adminRoute= express()
const upload = require("../Multer/multer");
const { saveProduct } = require("../Controllers/ProductController");

adminRoute.post('/', upload.single("image"),saveProduct)

module.exports=adminRoute;