import express from "express"
import productsRoutes from "./src/routes/products.js";
import brachesRoutes from "./src/routes/branch.js";

const app = express();

// Que pueda aceptar JSON desde postman
app.use(express.json())

app.use("/api/products",productsRoutes)
app.use ("/api/branches", brachesRoutes)

export default app;
