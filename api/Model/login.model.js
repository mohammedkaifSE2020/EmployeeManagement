import mongoose , {Schema} from "mongoose";    

const loginSchema = Schema({
    f_sno : {
        required : true,
        type : String,
        unique : true
    },
    f_userName : {
        required : true,
        type : String,
        unique : true
    },
    f_Pwd : {
        required : true,
        type : String,
        unique : true
    }
})

const Login = mongoose.model("Login",loginSchema);

export default Login;