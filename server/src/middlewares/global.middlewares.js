import mongoose from "mongoose";
import User from "../models/user.model.js";

function validateId(req, res, next) {
    const id = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido"); 
    }

    next();
}

async function validateUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id).exec();

        if(!user) {
            return res.status(400).send("Usuário não encontrado");
        }
        
    } catch (error) {
        res.send(error.message);
    }

    next();
}

function validateUserData(req, res, next) {
    const {name, username, email, password, avatar, background} = req.body;
    
    if(!name ||
    ! username ||
    ! email ||
    ! password ||
    ! avatar ||
    ! background
    ) {
        return res.status(400).send({ message: "Por favor preencha todos os campos"});
    }

    next();
}

function validateUserDataToUpdate(req, res, next) {
    const {name, username, email, password, avatar, background} = req.body;

    if(!name &&
    ! username &&
    ! email &&
    ! password &&
    ! avatar &&
    ! background
    ) {
        return res.status(400).send({ message: "Por favor preencha pelo menos um campo a ser atualizado"});
    }

    next();
}

export default {validateId, validateUser, validateUserData, validateUserDataToUpdate};