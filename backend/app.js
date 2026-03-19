import express from "express"
import productsRoutes from "./src/routes/products.js";
import brachesRoutes from "./src/routes/branch.js";
import employeesRoutes from "./src/routes/employees.js";
import reviewRoutes from "./src/routes/review.js"

const app = express();

// Que pueda aceptar JSON desde postman
app.use(express.json())

app.use("/api/products",productsRoutes)
app.use ("/api/branches", brachesRoutes)
app.use ("/api/employees", employeesRoutes)
app.use ("/api/review", reviewRoutes)

export default app;
