const VehicleModel = require('../models/vehicle');

// GET ALL VEHICLES
const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await VehicleModel.find();
        res.json({ message: 'Successfully retrieved all vehicles.', data: vehicles })
    } catch (err) {
        res.status(500).json({ message: "Fail to retrieve all vehicles" });
    }
};


// ADD NEW VEHICLE
const addNewVehicle = async (req, res) => {
    try {
        const vehicle = new VehicleModel({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            price: req.body.price,
            img: req.body.img,
            type: req.body.type,
            description: req.body.description
        });

        const newVehicle = await vehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully', data: newVehicle });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed to add new vehicle, please try again!' });
    }
};

// UPDATE VEHICLE
const updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(
            req.params.id,
            {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                color: req.body.color,
                price: req.body.price,
                img: {
                    data: req.body.img.data,
                    contentType: req.body.img.contentType
                },
                type: req.body.type,
                description: req.body.description
            },
            { new: true }
        );
        res.json({ message: 'Vehicle updated successfully', data: updatedVehicle });
    } catch (err) {
        res.status(500).json({ message: "Fail to update vehicle!" });
    }
};

// DELETE VEHICLE
const deleteVehicle = async (req, res) => {
    try {
        await VehicleModel.findByIdAndRemove(req.params.id);
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: "Fail to delete the vehicle!" });
    }
};


// SEARCH FOR VEHICLES BY KEYWORD
const searchByKeyword = async (req, res) => {
    try {
      const keyword = req.query.keyword.toLowerCase();
      const vehicles = await VehicleModel.find();
      const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.make.toLowerCase() === `${keyword}` ||
        vehicle.model.toLowerCase() === `${keyword}`
      );
      if (filteredVehicles.length === 0) {
        res.json({ message: "Can't find any vehicle matched." });
      } else {
        res.json({ message: 'Successfully retrieved matching vehicles.', data: filteredVehicles });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to search for vehicles" });
    }
  };
 
module.exports = {
    getAllVehicles,
    addNewVehicle,
    updateVehicle,
    deleteVehicle,
    searchByKeyword
};
