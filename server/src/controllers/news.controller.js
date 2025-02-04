import News from "../models/news.model.js";

async function create(req, res) {
    try {

        const {title, text, banner} = req.body;

        const newData = await News.create({
            title,
            text,
            banner,
            user: {_id: req.userId}
        });
        res.status(201).send({
            message: "Notícia cadastrada com sucesso",
            newData
        }) 
    } catch (error) {
        res.status(400).json(error.message);
    }
}

async function findAll(req, res) {
    try {
        const news = await News.find().exec();

        if(news.length === 0) {
            return res.status(400).send({ message: "Nenhuma notícia cadastrada"});
        }

        res.status(200).send(news);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export default {create, findAll};