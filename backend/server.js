import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/postRoutes.js";
import { connectDb } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello")
});

app.use(express.json());

//routes => login signup
app.use("/api/users", authRoutes);


app.use("/api/posts", postRoutes);


connectDb();
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});