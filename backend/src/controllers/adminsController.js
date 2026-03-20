const adminsController = {};

import adminsModel from "../models/adminsModel.js";

// SELECT
adminsController.getAdmins = async (req, res) => {
    try {
        const admin= await adminsModel.find()
        return res.status(200).json(admin) 
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message : "Internal server error"})
    }
}

// POST
adminsController.postAdmin = async (req,res) => {
    try {
        let {name, email,password,isVerified} = req.body;
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        if(email.length < 4){
            return res.status(400).json({message: "Email is too short"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password invalid"})
        }

        const newAdmins = new adminsModel({name, email,password,isVerified})
        await newAdmins.save()

        return res.status(201).json({message:"Admins saved"})
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
}

// UPDATE
adminsController.updateAdmins = async (req,res) => {
    try {
        let {name, email,password,isVerified} = req.body;

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if(email.length < 4){
            return res.status(400).json({message: "Email is too short"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password invalid"})
        }

        const updateAdmins = await adminsModel.findByIdAndUpdate(
            req.params.id,{
                name,
                slogan,
                address,
                isActive,},{new : true
            }
        );

        if(!updateAdmins){
            return res.status(404).json({message:("Admin not found")})
        }
        return res.status(200).json({message:"Admins updated"})

    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
};

// DELETE
adminsController.deleteAdmins = async (req, res) => {
    try {
        const deleteAdmins = await adminsModel.findByIdAndDelete(req.params.id)
        if(!deleteAdmins){
            return res.status(404).json({message: "Adins not found"})
        }

        return res.status(200).json({message:"Admins deleted"})
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
};

export default adminsController;