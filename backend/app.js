import express from "express"
import productsRoutes from "./src/routes/products.js";
import brachesRoutes from "./src/routes/branch.js";
import employeesRoutes from "./src/routes/employees.js";
import reviewRoutes from "./src/routes/review.js";
import reviewBrand from "./src/routes/brands.js";
import adminsRoute from "./src/routes/adminsRoutes.js"
import clientsRoutes from "./src/routes/clientsRoutes.js"
import customersRoutes from "./src/routes/customerRoutes.js"
import registerCustomerRoutes from "./src/routes/registerCustomers.js"
import cookieParser from "cookie-parser";
const app = express();

app.use (cookieParser());
// Que pueda aceptar JSON desde postman
app.use(express.json());

app.use("/api/products",productsRoutes);
app.use ("/api/branches", brachesRoutes);
app.use ("/api/employees", employeesRoutes);
app.use ("/api/review", reviewRoutes);
app.use ("/api/brands", reviewBrand);
app.use ("/api/admins", adminsRoute);
app.use("/api/clients", clientsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/registerCustomers", registerCustomerRoutes);
export default app;
