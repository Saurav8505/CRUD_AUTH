const Order = require("../models/order");
const Coupon = require("../models/coupon");
const Product = require("../models/product");

exports.createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, couponCode } = req.body;
    // Fetch product price from database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productPrice = product.price; // Get actual product price

    // Initialize discount
    let discount = 0;

    // Check for coupon
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        return res.status(400).json({ message: "Invalid coupon code" });
      }

      // Check if the coupon applies to the product
      if (
        coupon.applicableProducts.length > 0 &&
        !coupon.applicableProducts.includes(productId)
      ) {
        return res
          .status(400)
          .json({ message: "Coupon does not apply to this product" });
      }
      // Calculate discount based on coupon type
      if (coupon.discountType === "percentage") {
        discount = (productPrice * quantity * coupon.discountValue) / 100; 
      } else if (coupon.discountType === "fixed") {
        discount = coupon.discountValue;
      }
    }

    // Calculate the final price
    const totalPrice = productPrice * quantity;
    const finalPrice = totalPrice - discount;

    // Ensure final price is not negative
    const safeFinalPrice = finalPrice < 0 ? 0 : finalPrice;

    // Create the order
    const newOrder = new Order({
      userId,
      productId,
      quantity,
      status: "Pending", // Set initial status
      couponCode: couponCode || null, // Store coupon code
      finalPrice: safeFinalPrice, // Store calculated final price
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("userId productId");
  res.json(orders);
};

// Get a Order By Id
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "userId productId"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(order);
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(204).send();
};