import mongoose from "mongoose";

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb+srv://paulogalvaoj21:paulo123@cluster0.uxez3.mongodb.net/breaking-news");
        console.log("Connected to Mongo Database");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDatabase;