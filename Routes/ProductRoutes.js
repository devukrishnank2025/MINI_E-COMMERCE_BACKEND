const express = require("express");
const productRoute= express()
const { readProduct } = require("../Controllers/ProductController");



productRoute.get('/',readProduct)



module.exports=productRoute;