const productModel = require("../Models/productModel");


const saveProduct = async (req, res) => {

    console.log('i got the call');
    

    try {
        const product = new productModel({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            rating: req.body.rating,
            purchased: req.body.purchased,
            discount: req.body.discount,
            brand: req.body.brand,
            description: req.body.description,
            image: req.file.filename
        })
        console.log(product);

        const newres= await product.save()
        if(newres){
            res.json({ message: "Product added successfully", file: product })
        }

    } catch (error) {
        console.log("error from save Product : ", error)
    }
}

const getSortOption = (sort) => {
    switch (sort) {
        case "price_asc": return { price: 1 }
        case "price_desc": return { price: -1 }
        case "name": return { name: 1 }
        default: return { name: 1 }
    }
}
const readProduct = async (req, res) => {

    console.log("getting request in readProduct");
    
    try {
        const { pageNo = 0, search = "", sort = "name", category = "" } = req.query
        const skip = pageNo * 8

        const query = {
            ...(search && {
                $or: [{ name: { $regex: search, $options: "i" } },{ brand: { $regex: search, $options: "i" } }]}),
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
    } catch (error) {
        console.log("error readProduct catched:", error);
    }}


module.exports = {
    readProduct,
    saveProduct
}