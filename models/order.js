const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    couponCode: { // Added field for the coupon code
        type: String,
        required: false // Make it optional, as not all orders may use a coupon
    },
    finalPrice: { // Price after applying the coupon
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;