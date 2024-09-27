import express from "express"
import Dotenv from "dotenv"
import dbConnect from "./dbConnect/dbConnect.js";
import loginRouter from "./Routes/login.route.js";
import employeeRouter from "./Routes/employee.route.js";

const app = express()
app.use(express.json())
Dotenv.config()

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log("Server is running")
});

dbConnect();

app.get('/',(req,res)=>{
    res.send("Server Started");
})

app.use("/api/auth",loginRouter);
app.use("/api/employee",employeeRouter);