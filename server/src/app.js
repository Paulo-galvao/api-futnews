import express from "express";
import connectDatabase from "./config/conn.js";

import "dotenv/config";
import userController from "./controllers/user.controller.js";

const port = process.env.PORT;
const app = express();

app.use(express.json());

connectDatabase();

// app.get("/", (req, res) => {
//     res.json({message: "Welcome to breaking news"});
// });

app.post('/api/user', userController.create);
app.get('/api/user', userController.findAll);
app.get('/api/user/:id', userController.findById);

app.listen(port, () => {
    console.log("Server running at port", port);
});