import mongoose from "mongoose";
import User from "../models/user.model.js";

async function create(req, res) {
    try {
        const {name, username, email, password, avatar, background} = req.body;
    
        if(!name ||
        ! username ||
        ! email ||
        ! password ||
        ! avatar ||
        ! background
        ) {
            res.status(400).send({ message: "Por favor preencha todos os campos"});
        }
    
        const newUser = await User.create(req.body);
        res.status(201).send({
            newUser,
            message: "Usuário cadastrado com sucesso"
        });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function findAll(req, res) {
    try {
        const users = await User.find().exec();

        if(users.length == 0) {
            res.status(400).send({ message: "Nenhum usuário cadastrado"})
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function findById(req, res) {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("ID inválido"); 
        }

        const user = await User.findById(id).exec();

        if(!user) {
            res.status(400).send("Usuário não encontrado");
        }

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {create, findAll, findById};