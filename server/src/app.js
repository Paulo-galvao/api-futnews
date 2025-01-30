import express from "express";
import connectDatabase from "./config/conn.js";
import userRouter from "./routes/user.route.js";

import "dotenv/config";

const port = process.env.PORT;
const app = express();

app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
    res.json({message: "Welcome to breaking news"});
});

app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log("Server running at port", port); 
});