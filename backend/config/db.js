import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}