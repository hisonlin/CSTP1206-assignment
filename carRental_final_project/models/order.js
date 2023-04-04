const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    vehicle_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
   
}, {
    timestamps: true
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
