const express = require("express");
const connect = require("./DB/db_connection");
require("dotenv").config()

const cors = require("cors");

const adminRoute = require("./Routes/AdminRoutes");
const productRoute = require("./Routes/ProductRoutes");

const app = express();
const port = process.env.PORT || 3000;

connect();

app.use(cors());
app.use(express.json());

app.use("/ProductImages", express.static("public/productImages"));



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Mini E-Commerce Backend Running"
    });
});



app.use("/addProduct", adminRoute);
app.use("/readProduct", productRoute);


app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});