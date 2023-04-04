const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicle');

// GET ALL VEHICLES
router.get('/', VehicleController.getAllVehicles);

// ADD NEW VEHICLE
router.post('/', VehicleController.addNewVehicle);

// UPDATE VEHICLE
router.put('/:id', VehicleController.updateVehicle);

// DELETE VEHICLE
router.delete('/:id', VehicleController.deleteVehicle);

//SEARCH VEHICLE BY KEYWORD
router.get('/search', VehicleController.searchByKeyword);

module.exports = router;
