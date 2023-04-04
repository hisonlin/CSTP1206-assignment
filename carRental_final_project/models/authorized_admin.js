const mongoose = require('mongoose');

const AuthorizedAdminSchema = mongoose.Schema({
    admin_id: {
        type: String,
        required: true
    }
   
}, {
    timestamps: true
})

const AuthorizedAdminModel = mongoose.model('Authorized_Admin', AuthorizedAdminSchema);

module.exports = AuthorizedAdminModel;