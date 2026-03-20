import express from "express";
import brandController from "../controllers/brands.js";

const router = express.Router();

router. route("/")
.get(brandController.getBrand)
.post(brandController.postBrand)

router.route("/:id")
.put(brandController.updateBrand)
.delete(brandController.deleteBrand)
export default router