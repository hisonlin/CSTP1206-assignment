const AuthorizedAdminModel = require('../models/authorized_admin');

// GET ALL AUTHORIZED ADMINS
const getAllAuthorizedAdmins = async (req, res) => {
    try {
        const admins = await AuthorizedAdminModel.find();
        res.json({ message: "Successfully retrieved all authorized admins.", data: admins });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addNewAuthorizedAdmin = async (req, res) => {
    const admin = new AuthorizedAdminModel({
        admin_id: req.body.admin_id
    });

    try {
        const newAdmin = await admin.save();
        res.status(201).json({ message: "Successfully added a new authorized admin.", data: newAdmin });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
  
  // DELETE AUTHORIZED ADMIN
  const deleteAuthorizedAdmin = async (req, res) => {
  
    try {
      await AuthorizedAdminModel.findByIdAndRemove(req.params.id);
      res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = {
    getAllAuthorizedAdmins,
    addNewAuthorizedAdmin,
    deleteAuthorizedAdmin
}