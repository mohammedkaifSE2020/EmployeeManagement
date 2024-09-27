import express from "express"
import { login, signUp } from "../Controller/login.controller.js";

const loginRouter = express.Router();

loginRouter.post('/signup',signUp);
loginRouter.post('/login',login);

export default loginRouter;