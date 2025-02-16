import express from "express"
import Dotenv from "dotenv"
import dbConnect from "./dbConnect/dbConnect.js";
import loginRouter from "./Routes/login.route.js";
import employeeRouter from "./Routes/employee.route.js";
import cors from 'cors'

const app = express()

app.use(cors({
    origin: "https://employee-management-wol5-5rwgewrqt.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If using cookies or sessions
  }));

app.use(express.json())
Dotenv.config()

const port = process.env.PORT || 8000

console.log(port)

app.listen(port,()=>{
    console.log("Server is running")
});

dbConnect();

app.get('/',(req,res)=>{
    res.send("Server Started");
})

app.use("/api/auth",loginRouter);
app.use("/api/employee",employeeRouter);