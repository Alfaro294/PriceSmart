import express from 'express'
import employeeController from '../controllers/employees.js'

const router = express.Router();

router.route("/")
.get(employeeController.getEmployee)
.post(employeeController.insertEmployees)

router.route("/:id")
.put(employeeController.updateEmployees)
.delete(employeeController.deleteEmployee)

export default router;