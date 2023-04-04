const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (request, response) => {
    const newUser = request.body;
    // Encrypting password so that no one as a developer can read it and misuse it
    const encryptPassword = await bcrypt.hash(newUser.password, 10);

    try {
        // Check if admin with given email already exists
        const userExists = await UserModel.findOne({ email: newUser.email });
        if (userExists) {
            return response.status(400).json({
                message: "Email already exists"
            });
        } else {
            let user = new UserModel({
                name: newUser.name,
                email: newUser.email,
                password: encryptPassword
            });
            await user.save();
            return response.status(201).json({
                message: "User sucesfully created",
                name: user.name
            })
        }


    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const loginUser = async (request, response) => {
    const incomingCredentials = request.body;

    let foundUser = await UserModel.findOne({ email: incomingCredentials.email });


    if (foundUser) {
        // Verify if this credetial is valid, decrypting using compare function
        const matchPassword = await bcrypt.compare(incomingCredentials.password, foundUser.password);

        if (matchPassword) {
            // let the user login

            //save email and name inside the token
            const accessToken = jwt.sign({
                email: foundUser.email,
                name: foundUser.name
            }, process.env.USERSECRETKEY)

            return response.status(200).json({
                message: "Succesfully Logged in",
                token: accessToken,
                user: foundUser
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
            message: "User doesn't Exist"
        })
    }

}

const getAllUsers = async (request, response) => {
    try {
        let data = await UserModel.find();
        return response.status(200).json({
            message: "Succesfully Fetched the users",
            data
        })
    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getUserById = async (request, response) => {
    const id = request.params.id;


    try {
        const userData = await UserModel.findById(id);

        if (userData) {
            return response.status(200).json({
                message: `Succesfully Fetched the User ${userData.name}`,
                data: userData
            })
        }

        return response.status(404).json({
            message: "User Does not Exist",
        })
    } catch (error) {
        response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const updateUser = async (request, response) => {
    const id = request.params.id;
    const incomingData = request.body;

    try {
        const userData = await UserModel.findByIdAndUpdate(id, incomingData, { returnOriginal: false });
        return response.status(200).json({
            message: `Succesfully Updated the Admin ${userData.name}`,
            data: userData
        })
    } catch (error) {
        response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const deleteUser = async (request, response) => {
    const id = request.params.id;
    try {
        let data = await UserModel.findByIdAndDelete(id);
        return response.status(200).json({
            message: "Succesfully deleted the user",
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
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}

