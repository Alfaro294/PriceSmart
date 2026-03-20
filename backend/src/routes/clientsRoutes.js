import express from "express";
import clientController from "../controllers/clientsController.js";
import clientsController from "../controllers/clientsController.js";

const router = express.Router();

router.route("/")
.get(clientsController.getClients)
.post(clientController.postClient)

router.route ("/:id")
.put(clientsController.PUTClient)
.delete(clientController.deleteClients)
export default router