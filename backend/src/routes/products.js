import express from "express"
import productsController from "../controllers/productsController.js"

// Router ayuda a colocar los métodos que tendrá un endpoint
const router = express.Router()

router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts)

router.route("/:id")
.put(productsController.updateProducts)
.delete(productsController.deleteProducts)

export default router;
