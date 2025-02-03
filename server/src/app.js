import express from "express";
import connectDatabase from "./config/conn.js";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import newsRouter from "./routes/news.route.js";

import "dotenv/config";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
    res.json({message: "Welcome to breaking news"});
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);

app.listen(port, () => {
    console.log("Server running at port", port); 
});