const Coupon = require("../models/coupon");

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const {code, discountType, discountValue, applicableProducts, applicableCategories} = req.body;

    // Validate required fields
    if (!code || !discountType || !discountValue || !applicableProducts || !applicableCategories) {
      return res.status(400).json({
        message:
          "Code, discount type, discount value and applicable Products are required.",
      });
    }

    // Create a new coupon
    const coupon = new Coupon({
      code,
      discountType,
      discountValue,
      applicableProducts,
      applicableCategories,
    });
    const savedCoupon = await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon: savedCoupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Error creating coupon", error });
  }
};

// Get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error("Error retrieving coupons:", error);
    res.status(500).json({ message: "Error retrieving coupons", error });
  }
};

// Get a single coupon by ID
exports.getCouponById = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error("Error retrieving coupon:", error);
    res.status(500).json({ message: "Error retrieving coupon", error });
  }
};

// Update a coupon by ID
exports.updateCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res
      .status(200)
      .json({ message: "Coupon updated successfully", coupon: updatedCoupon });
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ message: "Error updating coupon", error });
  }
};

// Delete a coupon by ID
exports.deleteCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ message: "Error deleting coupon", error });
  }
};
