const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

// Login API
router.post('/login', AdminController.loginAdmin)


// SIGNUP API
router.post('/', AdminController.registerAdmin)


// DELETE USER
router.delete('/:id', AdminController.deleteAdmin)


// UPDATE USER
router.put('/:id', AdminController.updateAdmin)


// GET USER BY ID
router.get('/:id', AdminController.getAdminById)


// GET ALL USERS
router.get('/', AdminController.getAllAdmins)



module.exports = router;