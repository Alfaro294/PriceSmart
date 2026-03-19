const employeesController = {};

import employeesModel from "../models/employees.js";

// SELECT

employeesController.getEmployee = async (req, res) => {
    const employee = await employeesModel.find()
    res.json(employee)
};

// INSERT
employeesController.insertEmployees = async (req, res) => {
    const {name, lastName, Salary, DUI, phone,email,password, idBranches} = req.body;
    // Se llenan los modelos con los datos que se acaban de pedir
    const newEmployee = new employeesModel({
        name,
        lastName,
        Salary,
        DUI,
        phone,
        email,
        password,
        idBranches
    });
    // Se guardadn todos los documentos en la base de datos
    await newEmployee.save()
    res.json({message: "Employee saved"})
};

// DELETE
employeesController.deleteEmployee = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id)
    res.json({message:"Employee deleted"})
};

// UPDATE
employeesController.updateEmployees = async (req, res) =>{
    const {name, lastName,Salary, DUI, phone,email,password, idBranches} = req.body;
    await employeesModel.findByIdAndUpdate (req.params.id, {name, lastName,Salary, DUI, phone,email,password, idBranches})
    res.json ({message: "Employee updated"})
};

export default employeesController;