const express = require("express");
const connect = require("./DB/db_connection");
const path = require("path");

require("dotenv").config()

const cors = require("cors");

const adminRoute = require("./Routes/AdminRoutes");
const productRoute = require("./Routes/ProductRoutes");
const productModel = require("./Models/productModel");

const app = express();
const port = process.env.PORT || 3000;

connect();

app.use(cors());
app.use(express.json());

app.use(
  "/ProductImages",
  express.static(path.join(__dirname, "public", "productImages"))
);



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Mini E-Commerce Backend Running"
    });
});

// app.get("/temporary",async(req,res)=>{

//     const data = await productModel.find()
//     console.log(data);
    

//     console.log("this is the request in the temporary");
    
//     res.send("this is a request in the given route");
// })



app.use("/addProduct", adminRoute);
app.use("/readProduct", productRoute);


app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});