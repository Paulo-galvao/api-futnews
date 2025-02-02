import bcrypt from "bcrypt";
import User from "../models/user.model.js";

async function login(req, res) {
    try {
        const {username, password} = req.body;

        if(!username || !password) {
            return res.status(400).send({message: "Por favor preencha todos os campos"});
        }
        
        const user = await User.findOne({username: username}).select("+password");
        
        if(!user) {
            return res.status(400).json({message: "Usuário ou senha incorretos"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);


        if(!isPasswordValid || !user) {
            return res.status(400).json({message: "Usuário ou senha incorretos"});
        }

        res.status(200).send({message: "Logado na banca"})
    } catch (error) {
        res.status(400).send(error.message); 
    }
} 

export default {login};