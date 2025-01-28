function create(req, res) {
    const {name, username} = req.body;

    if(!name || ! username) {
        res.status(400).send({ message: "Por favor preencha todos os campos"});
    }

    res.status(201).send({
        user: {
            name, username
        },
        message: "Usuário cadastrado com sucesso"
    });
}

export default {create};