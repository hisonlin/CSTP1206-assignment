const OrderModel = require('../models/order');

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.json({ message: 'Successfully retrieved all orders.', data: orders })
    } catch (err) {
        res.status(500).json({ message: "Fail to retrieve all orders" });
    }
};


// ADD NEW ORDER
const addNewOrder = async (req, res) => {
    try {
        const order = new OrderModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            contact: req.body.contact,
            email: req.body.email,
            address: req.body.address,
            vehicle_id: req.body.vehicle_id,
            user_id: req.body.user_id
        });

        const newOrder = await order.save();
        res.status(201).json({ message: 'Order created successfully', data: newOrder });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed to make order, please try again!' });
    }
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact: req.body.contact,
                email: req.body.email,
                address: req.body.address,
                vehicle_id: req.body.vehicle_id,
                user_id: req.body.user_id
            },
            { new: true }
        );
        res.json({ message: 'Order updated successfully', data: updatedOrder });
    } catch (err) {
        res.status(500).json({ message: "Fail to update order!" });
    }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted successfully', data: order });
    } catch (err) {
        res.status(500).json({ message: "Fail to delete order!" });
    }
};


//SEARCH ORDER BY ID
const searchOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        res.json({ message: 'Successfully retrieved order.', data: order })
    } catch (err) {
        res.status(500).json({ message: "Fail to retrieve order" });
    }
};

module.exports = {
    getAllOrders,
    addNewOrder,
    updateOrder,
    deleteOrder,
    searchOrderById
};
