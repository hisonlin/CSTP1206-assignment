const AdminModel = require('../models/admin');
const AuthorizedAdminModel = require('../models/authorized_admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//  APPLICATION

const registerAdmin = async (request, response) => {
    const newAdmin = request.body;
    const adminId = newAdmin.admin_id;

    try {
        // Check if admin with given admin_id is authorized
        const authorizedAdmin = await AuthorizedAdminModel.findOne({ admin_id: adminId });
        if (!authorizedAdmin) {
            return response.status(401).json({
                message: "Unauthorized!"
            });
        }

        // Encrypting password so that no one as a developer can read it and misuse it
        const encryptPassword = await bcrypt.hash(newAdmin.password, 10);

        // Check if admin with given email already exists
        const adminExists = await AdminModel.findOne({ email: newAdmin.email });
        if (adminExists) {
            return response.status(400).json({
                message: "Email already exists"
            });
        } else {
            let admin = new AdminModel({
                admin_id: adminId,
                name: newAdmin.name,
                email: newAdmin.email,
                password: encryptPassword
            });
            await admin.save();
            return response.status(201).json({
                message: "Admin sucesfully created",
                name: admin.name
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        });
    }
};

const loginAdmin = async (request, response) => {
    const incomingCredentials = request.body;

    let foundAdmin = await AdminModel.findOne({ email: incomingCredentials.email });


    if (foundAdmin) {
        // Verify if this credetial is valid, decrypting using compare function
        const matchPassword = await bcrypt.compare(incomingCredentials.password, foundAdmin.password);

        if (matchPassword) {
            // let the user login

            //save email and name inside the token
            const accessToken = jwt.sign({
                email: foundAdmin.email,
                name: foundAdmin.name
            }, process.env.ADMINSECRETKEY)

            return response.status(200).json({
                message: "Succesfully Logged in",
                token: accessToken,
                admin: foundAdmin
            })
        } else {
            // Return the password is incorrect
            return response.status(401).json({
                message: "Password is incorrect, try again"
            })
        }


    } else {
        // Return that user doesn't exist
        return response.status(404).json({
            message: "Admin doesn't Exist"
        })
    }

}

const getAllAdmins = async (request, response) => {
    try {
        let data = await AdminModel.find();
        return response.status(200).json({
            message: "Succesfully Fetched the admins",
            data
        })
    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getAdminById = async (request, response) => {
    const id = request.params.id;


    try {
        const adminData = await AdminModel.findById(id);

        if (adminData) {
            return response.status(200).json({
                message: `Succesfully Fetched the Admin ${adminData.name}`,
                data: adminData
            })
        }

        return response.status(404).json({
            message: "Admin Does not Exist",
        })
    } catch (error) {
        response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const updateAdmin = async (request, response) => {
    const id = request.params.id;
    const incomingData = request.body;

    try {
        const adminData = await AdminModel.findByIdAndUpdate(id, incomingData, { returnOriginal: false });
        return response.status(200).json({
            message: `Succesfully Updated the Admin ${adminData.name}`,
            data: adminData
        })
    } catch (error) {
        response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const deleteAdmin = async (request, response) => {
    const id = request.params.id;
    try {
        let data = await AdminModel.findByIdAndDelete(id);
        return response.status(200).json({
            message: "Succesfully deleted the admin",
            data
        })
    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}

