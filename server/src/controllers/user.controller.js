import User from "../models/user.model.js";

async function create(req, res) {
    try {    
        const newUser = await User.create(req.body);
        res.status(201).send({
            message: "Usuário cadastrado com sucesso",
            newUser
        });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function findAll(req, res) {
    try {
        const users = await User.find().exec();

        if(users.length == 0) {
            return res.status(400).send({ message: "Nenhum usuário cadastrado"})
        }

        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function findById(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id).exec();
        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;

        await User.findByIdAndUpdate(id, req.body).exec();
        const user = await User.findById(id).exec();

        res.status(200).send({
            message: "Usuário atualizado com sucesso",
            user 
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {create, findAll, findById, update};