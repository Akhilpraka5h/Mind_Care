const User = require('../models/UserDataModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserData = async (req, res) => {
    try {

        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.id.toString(); // Convert userId to a string


        const userData = await User.findById(userId);
        res.send(userData);

        // res.status(200).json(userData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.userRoleData = async (req, res) => {
    try {
        const response = await User.find({ role: 'Patient' })
        if (!response) return res.status(404).json("No Data")
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(501).json("Internal server Error")
    }
}

exports.PostUserData = async (req, res) => {
    const { fullName } = req.body;
    const { role } = req.body;
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];
    const { email } = req.body;
    const { password } = req.body;


    // console.log(role);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const userData = {
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        email: email,
        role: role,
    }
    console.log(userData);


    try {
        const findEmail = await User.findOne({ email: userData.email });
        // const findPhone = await User.findOne({ phone: userData.phone });

        // if (findPhone) {
        //     return res.status(400).json({ message: "Phone already exists" });
        // }


        if (findEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUserData = new User(userData);

        await newUserData.save();
        res.status(201).json({ message: "Profile Created Succesfully", newUserData });
    } catch (error) {
        res.status(409).json({ message: error.message + "Error in creating profile" });
    }
}

exports.UpdateUserData = async (req, res) => {
    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    const { firstName, lastName, email, age, gender, phone, address, about, specialization, reqStatus } = req.body;

    // const firstName = fullName.split(" ")[0];
    // const lastName = fullName.split(" ")[1];
    const userData = {
        firstName,
        lastName,
        email,
        age,
        phone: phone || null,
        gender,
        about,
        address,
        reqStatus,
        specialization
    };

    console.log("req:  ", reqStatus);



    const findUser = await User.findById(userId);

    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const requestData = { ...userData };

    if (req.file) {
        requestData.profilePic = req.file.filename;
    }

    const options = { new: true };


    // const prevEmail = findUser.email;
    // const prevPhone = findUser.phone;


    // if (email != prevEmail) {

    //     const existingEmail = await User.findOne({ email }); 

    //     if (existingEmail) {
    //         return res.status(400).json({ message: "Email already exists" });
    //     }
    // }else if(phone != prevPhone){
    //     const existingPhone = await User.findOne({ phone });

    //     if (existingPhone) {
    //         return res.status(400).json({ message: "Phone already exists" });
    //     }
    // }

    try {
        const updatedUserData = await User.findByIdAndUpdate(
            userId,
            requestData,
            options
        );
        res.status(200).json(updatedUserData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



exports.deleteUserData = async (req, res) => {
    const userId = req.params.userId; // Assuming the user ID is passed as a parameter
    try {
        console.log(userId);
        const response = await User.findOneAndDelete({ _id: userId });
        if (!response) return res.status(404).json("Data is Not Deleted")
        return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}

exports.getDoctorsData = async (req, res) => {
    try {
        const doctorsData = await User.find({ role: "Doctor" });
        res.status(200).json(doctorsData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


exports.saveDrAppointmentId = async (req, res) => {

    const { patientId, drId } = req.body;


    const userId = jwt.verify(patientId, process.env.TOKEN_SECRET).id;

    console.log("userId: ", userId);

    if (!userId || !drId) { res.status(400).json("Req body data not found") };

    try {
        const response = await User.findOneAndUpdate(
            // search criteria
            { _id: userId },

            //update
            { $push: { drAppointmentId: drId.toString() } },

            { returnDocument: "after" }
        )

        console.log("Dr id addedd: ", response);
        res.status(200).json({ "Dr id addedd": response })

    } catch (error) {

        console.log(error)

    }
}


// exports.deleteDrAppointmentId = async (req, res) => {

//     const { patientId, drId } = req.query;
//     const userId = jwt.verify(patientId, process.env.TOKEN_SECRET);
//     if (!userId || !drId) { res.status(400).json("Req body data not found") };
//     try {
//         const response = await User.findOneAndUpdate(
//             // search criteria
//             { _id: userId, drAppointmentId: drId },
//             //update
//             { $pull: { drAppointmentId: drId } },
//             { returnDocument: "after" }
//         )

//         console.log("Dr id deleted: ", response);
//         return res.status(200).json({ "Dr id addedd": response })

//     } catch (error) {

//         return res.status(501).json("Internal server error")

//     }
// }
exports.deleteDrAppointmentId = async (req, res) => {
    const { patientId, drToken } = req.query;
    const drId = jwt.verify(drToken, process.env.TOKEN_SECRET);
    try {
        const appointmentstatus = await User.findOneAndUpdate(
            // search criteria
            { _id: patientId, drAppointmentId: drId },
            //update
            { $pull: { drAppointmentId: drId } },
            { returnDocument: "after" }
        )
        console.log("Dr id addedd: ", response);
        return res.status(200).json({ "Dr id addedd": response })
    } catch (error) {

        console.log(error)
        return res.status(501).json("Internal server error")

    }

}

