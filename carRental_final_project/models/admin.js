const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    admin_id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
   
}, {
    timestamps: true
})

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;



