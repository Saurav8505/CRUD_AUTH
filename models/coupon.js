const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true // Ensure each coupon code is unique
    },
    discountType: { // e.g., percentage or fixed amount
        type: String,
        enum: ['percentage', 'fixed'], // Limit to specific values
        required: true
    },
    discountValue: {
        type: Number,
        required: true // The value of the discount
    },
    applicableProducts: [{ // Optional: Link to Product model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    applicableCategories: [{ // Optional: Specify categories the coupon applies to
        type: String
    }]
});

// Create the Coupon model
const Coupon = mongoose.model("Coupon", couponSchema);

// Export the Coupon model along with Product, User, and Order models
module.exports = Coupon;
