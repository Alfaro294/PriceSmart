const clientsController = {};

import clientsModel from "../models/adminsModel.js";

// SELECT
clientsController.getClients = async (req, res) => {
    try {
        const Clients = await clientsModel.find()
        return res.status(200).json(Clients)
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

// INSERT
clientsController.postClient = async (req,res) => {
    try {
        let {name, email, password, birthday, status, isVerified, loginAttemps, timeOut} = req.body;
        name = name?. trim();
        email = email?.trim();

        // Validaciones
        if(!name || !email || !password || !birthday){
            return res.status(400).json({message: "All fields are required"})
        }
        // Fecha
        if(isNaN(birthday.getTime())){
            return res.status(400).json({message: "Date is invalid"})
        }
        if(birthday.now()){
            return res.status(400).json({message: "Birthday can't be now"})
        }

        const newClient = new clientsModel({name, email, password, birthday, status, isVerified, loginAttemps, timeOut})
        await newClient.save()

        return res.status(201).json({message:"Client Saved"})
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

// UPDATE
clientsController.PUTClient = async (req, res) => {
    try {
        let {name, email, password, birthday, status, isVerified, loginAttemps, timeOut} = req.body;
        name = name?. trim();
        email = email?.trim();

        // Validaciones
        if(!name || !email || !password || !birthday){
            return res.status(400).json({message: "All fields are required"})
        }
        // Fecha
        if(isNaN(birthday.getTime())){
            return res.status(400).json({message: "Date is invalid"})
        }
        if(birthday.now()){
            return res.status(400).json({message: "Birthday can't be now"})
        }
        // Actualizamos
        const updateClients = await clientsModel.findByIdAndDelete(req.params.id,{
            name,
            email,
            password,
            birthday,
            status,
            isVerified,
            loginAttemps, timeOut ,}, {new : true
        }
        );
        if (!updateClients){
            return res.status(404).json({message : "Clients not found"})
        }
        return res.status(200).json({message:"Clients updated"})
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
};
// DELETE
clientsController.deleteClients = async (req,res) => {
    try {
        const deleteClients = await clientsModel.findByIdAndDelete(req.params.id)
        // Caso de no ser borrado
        if(!deleteClient){
            return res.status(404).json({message: "Clients not found"})
        }
        return res.status(200).json({message:"Client deleted"})
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internla server error"})
    }
};
export default clientsController;