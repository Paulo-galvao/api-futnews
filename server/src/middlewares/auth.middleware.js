import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function authMiddleware(req, res, next) {
    try {
        
        const secretkey = process.env.HASHJWT;
    
        // verificações
        const {authorization} = req.headers;
            
        if(!authorization) {
            return res.status(401).send({message: "Usuário não autorizado"});
        }
    
        const parts = authorization.split(" ");
        const [schema, token] = parts;
    
        if(schema !== "Bearer") {
            return res.status(401).send({message: "Usuário não autorizado"});
        }
        
        const {title, text, banner} = req.body;
    
        if(!title || !text || !banner) {
            return res.status(400).send({message: "Por favor preencha todos os campos"});
        }
    
        // verificação do token
        jwt.verify(token, secretkey, async (error, decoded) => {
            console.log({error: error});
            console.log(decoded);
            
            req.userId = decoded.id;
            const userLogged = await User.findById(req.userId);
            console.log(userLogged);


            return next();
        });
    
    
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default authMiddleware;