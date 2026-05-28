const mongoose = require('mongoose');

const product = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    purchased: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
     category: {
        type: String,
        default: ''
    },description: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('product', product);