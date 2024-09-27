import express from "express"
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "../Controller/employee.controller.js";
import { upload } from "../Utils/multer.middleware.js";

const employeeRouter = express.Router();

employeeRouter.post('/create',upload.single('f_Image'),createEmployee);
employeeRouter.delete('/delete/:id',deleteEmployee);
employeeRouter.post('/update/:id',upload.single('f_Image'),updateEmployee);
employeeRouter.get('/get',getAllEmployees);

export default employeeRouter;