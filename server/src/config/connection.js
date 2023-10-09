import mongoose from "mongoose";
import { environment } from "./environments.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(environment.MONGO_URI)
        console.log(`DB is connected to ${mongoose.connection.db.databaseName}`)
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}