// Array de método
const branchesController = {};

import branchModel from "../models/branch.js";

// SELECT
branchesController.getBranch = async (req, res) => {
    const branch = await branchModel.find()
    res.json(branch)
};

// INSERTAR 
branchesController.insertBranch = async (req, res) => {
    const {name, address, schedule, isActive} = req.body;
    const newBranch = new branchModel({name, address, schedule, isActive})
    await newBranch.save()

    res.json({message: "Branch save"})
};

// ACTUALIZAR
branchesController.updateBranch = async (req, res) =>{
    const {name, address, schedule, isActive} = req.body;
    await branchModel.findByIdAndUpdate(req.params.id , {name, address, schedule, isActive}, {new : true})

    res.json({message:"branch updated"})
};

// DELETE
branchesController.deleteBranch = async(req, res) => {
    await branchModel.findByIdAndDelete (req.params.id)
    res.json({message:"branch deleted"})
};

export default branchesController;