const express = require("express");
const connect = require("./DB/db_connection");
const upload = require("./Multer/multer");
const productModel = require("./Models/productModel");
const cors =require('cors')


const app = express();
const port = process.env.PORT || 3000;

connect();
app.use(cors());  
app.use("/ProductImages", express.static("public/productImages"))

app.get('/', (req, res) => {
    res.send("app connected")
})
app.post('/addProduct', upload.single("image"), (req, res) => {

    const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename
    })
     product.save()
    res.json({ message: "Product added successfully",file:product })
})


app.get('/readProduct',async(req,res)=>{
    const product =await productModel.find()
    res.json({"message":"got the product",data:product})
})





app.listen(port, () => {
    console.log("Server Started");
})


