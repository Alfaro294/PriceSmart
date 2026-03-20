const brandController = {};

import brandsModel from "../models/brands.js";

// SELECT
brandController.getBrand = async (req, res) => {
    try {
        const br = await brandsModel.find()
        return res.status(200).json(br)
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
        
    }
}

// INSERT
brandController.postBrand = async (req, res) => {
   try {
        let {name, slogan, address, isActive} = req.body;
        // Validaciones
        //Sanitizar
        name = name?.trim(); //Borra los espacios al momento de ingresar los datos
        slogan = slogan?.trim();
        address = address?.trim();

        // Validaciones de datos nulos o require
        if(!name || !slogan || !address){
            return res.status(400).json({message: "All fields are required"})
        }
        // Validaciones de tamaño del registro
        if(name.length < 3){
            return res.status(400).json({message: "name too short"})
        }
        if (address.length > 100){
            return res.status(400).json({message: "address too long"})
        }

        const newBrand = new brandsModel({name, slogan, address, isActive})
        await newBrand.save()

        return res.status(201).json({message:"Brand saved"})
   } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"})
    
   }
};

// DELETE
brandController.deleteBrand = async (req, res) => {
    try {
        const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id)
        // Validacion en caso de no ser borrada
        if(!deleteBrand){
            return res.status(404).json({message:"brand not found"})
        }

        return res.status(200).json({message:"Brand deleted"})

    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message:"Internal server error"});
    }
};

// UPDATE
brandController.updateBrand = async (req, res) => {
    try {
        let {name, slogan, address, isActive} = req.body;
         //Sanitizar
        name = name?.trim(); //Borra los espacios al momento de ingresar los datos
        slogan = slogan?.trim();
        address = address?.trim();

        // Validaciones de tamaño del registro
        if(name.length < 3){
            return res.status(400).json({message: "name too short"})
        }
        if (address.length > 100){
            return res.status(400).json({message: "address too long"})
        }

        // actualizamos
        const updatedBrands = await brandsModel.findByIdAndUpdate(
            req.params.id, {
                name,
                slogan,
                address,
                isActive,}, {new:true
            }
        );
        // Si no se actualiza
        if(!updatedBrands){
            return res.status(404).json({message:"brand not found"})
        }
        return res.status(200).json({message : "brand updated"})

    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"});
    }
};

export default brandController;