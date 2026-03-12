
//Crear un array de métodos
const productsController = {};

// Import del Schema de la colección que se va a utilizar

import productsModel from "../models/products.js";

//SELECT
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

//INSERTAR
