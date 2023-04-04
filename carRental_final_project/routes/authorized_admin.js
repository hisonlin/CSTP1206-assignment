const express = require('express');
const router = express.Router();
const AuthorizedAdminController = require('../controllers/authorized_admin');

// GET ALL AUTHORIZED ADMINS
router.get('/', AuthorizedAdminController.getAllAuthorizedAdmins);

// ADD NEW AUTHORIZED ADMIN
router.post('/', AuthorizedAdminController.addNewAuthorizedAdmin);

// DELETE AUTHORIZED ADMIN
router.delete('/:id', AuthorizedAdminController.deleteAuthorizedAdmin);

module.exports = router;
