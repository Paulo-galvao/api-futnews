import mongoose from "mongoose";

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to Mongo Database");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDatabase;