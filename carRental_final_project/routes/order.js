const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');

// GET ALL ORDERS
router.get('/', OrderController.getAllOrders);

// ADD NEW ORDER
router.post('/', OrderController.addNewOrder);

// UPDATE ORDER
router.put('/:id', OrderController.updateOrder);

// DELETE ORDER
router.delete('/:id', OrderController.deleteOrder);

//SEARCH ORDER BY ID
router.get('/:id', OrderController.searchOrderById);

module.exports = router;
