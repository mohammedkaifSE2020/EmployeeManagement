import mongoose from "mongoose"

const dbConnect = async()=>{
    try {
        const isConnected  = await mongoose.connect(process.env.MONGODB_URI);
        if(!isConnected){
            console.log("Error connecting database")
        }
        else{
            console.log("database connected succesfully")
        }
    } catch (error) {
        console.log("Error connecting database",error.message)
    }
}

export default dbConnect;