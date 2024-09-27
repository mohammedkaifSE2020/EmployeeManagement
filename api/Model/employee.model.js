import mongoose , {Schema} from "mongoose";

//f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,  f_gender,f_Course,f_Createdate			

const employeeSchema = Schema({
    f_Id : {
        required : true,
        type : String,
        unique : true
    },
    f_Name : {
        required : true,
        type : String,
    },
    f_Email : {
        required : true,
        type : String,
        unique : true
    },
    f_Mobile : {
        required : true,
        type : Number,
        unique : true
    },
    f_Designation : {
        required : true,
        type : String,
    },
    f_gender : {
        required : true,
        type : String,
    },
    f_Course : {
        required : true,
        type : String,
    },
    f_Image : {
        required : true,
        type : String,
    },

},{
    timestamps: true
});

const Employee = mongoose.model("Employee",employeeSchema);

export default Employee;