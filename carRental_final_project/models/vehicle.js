const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const VehicleModel = mongoose.model('Vehicle', VehicleSchema);

module.exports = VehicleModel;
