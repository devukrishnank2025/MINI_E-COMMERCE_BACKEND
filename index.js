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


const getSortOption= (sort)=>{
    switch(sort) {
        case "price_asc":  return { price: 1 }  
        case "price_desc": return { price: -1 }  
        case "name":       return { name: 1 }
        default:           return { name: 1 }
    }
}

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
        const { pageNo = 0, search = "", sort = "name", category = "" } = req.query
        const skip = pageNo * 8

        const query = {
            name: { $regex: search, $options: "i" },   
            ...(category && { category })                
        }
        
  
        const total = await productModel.countDocuments(query) 
        
        

        const product = await productModel
            .find(query)
            .sort(getSortOption(sort))
            .skip(skip)
            .limit(8)

        res.json({
            message: "got the product",
            data: product,
            totalPages: Math.ceil(total / 8)       
        })
        
    })



app.listen(port, () => {
    console.log("Server Started");
})


