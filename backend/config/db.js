import mongoose from "mongoose";

const connectdb = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Successfuly connected to Mongodb');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectdb;