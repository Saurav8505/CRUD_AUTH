const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController'); // Assuming the controller is in 'controllers' folder

// Create a new coupon
router.post('/create', couponController.createCoupon);

// Get all coupons
router.get('/', couponController.getAllCoupons);

// Get a single coupon by ID
router.get('/:id', couponController.getCouponById);

// Update a coupon by ID
router.put('/:id', couponController.updateCoupon);

// Delete a coupon by ID
router.delete('/:id', couponController.deleteCoupon);

module.exports = router;
