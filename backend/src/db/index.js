// better approach
import mongoose from "mongoose";



const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`mongodb+srv://nijpadariya:Nij125909%40%40%40@cluster0.w6nczc3.mongodb.net/student_data`)
        console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MONGODB connection error ",error);
        process.exit(1);
    }
}

export default connectDB    