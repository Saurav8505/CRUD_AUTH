const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;


//Another code

// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');

// // Create a new order with optional coupon
// router.post('/', orderController.createOrder);

// // Get all orders
// router.get('/', orderController.getAllOrders);

// module.exports = router;
