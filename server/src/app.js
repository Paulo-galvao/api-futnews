import express from "express";
import "dotenv/config";

import userController from "./controllers/user.controller.js";

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to breaking news"});
});

app.post('/', userController.create);

app.listen(port, () => {
    console.log("Server running at port", port);
});