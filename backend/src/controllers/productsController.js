
//Crear un array de métodos
const productsController = {};

// Import del Schema de la colección que se va a utilizar

import productsModel from "../models/products.js";

// SELECT
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
};

// INSERTAR - CREATE
productsController.insertProducts = async (req, res) => {
    // 1 - Solicitar los campos
    const {name, description, price, stock} = req.body;

    const newProduct = new productsModel({name, description, price, stock})

    await newProduct.save()

    res.json({message: "Product save"})

};

// ELIMINAR - DELETE
productsController.deleteProducts = async (req, res) =>{
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({message: "product deleted"})
};

// ACTUALIZAR - UPDATE
productsController.updateProducts = async (req, res) => {
    // 1 - Solicitar los nuevos valores
    const {name, description, price, stock} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id, {name, description, price, stock}, {new: true})

    res.json({message: "product updated"})

};

export default productsController;