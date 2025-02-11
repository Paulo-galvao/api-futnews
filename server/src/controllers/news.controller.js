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
        //paginação de dados
        let {limit, offset} = req.query;
        const currentUrl = req.baseUrl;
        
        limit = Number(limit); // limitação do número de postagens exibidas por vez 
        offset = Number(offset); // de quanto em quanto aprecem as postagens

        if(!limit) {
            limit = 5;
        }
        
        if(!offset) {
            offset = 0;
        }

        const news = await News.find()
        .sort({_id: -1})
        .skip(offset)
        .limit(limit)
        .populate("user") // mostra os dados do user, ao invez do id
        .exec();
        // codigo acima inverte a ordem das postagens em relação o banco de dados
        // e limita mostrar 5 de cada vez

        const total = await News.countDocuments();
        
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}$offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if(news.length === 0) {
            return res.status(400).send({ message: "Nenhuma notícia cadastrada"});
        }

        res.status(200).send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(n => ({
                id: n._id,
                title: n.title,
                text: n.text,
                banner: n.banner,
                likes: n.likes,
                comments: n.comments,
                name: n.user.name,
                username: n.user.username,
                userAvatar: n.user.avatar
            }))
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

async function topNews(req, res) {
    try {
        const news = await News.findOne().sort({ _id: -1}).populate("user");

        if(!news) {
            return res.status(400).send({
                message: "Ainda não temos nenhuma notícia cadastrada"
            })
        }

        res.send({
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            userAvatar: news.user.avatar
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function findById(req, res) {
    try {
        const id = req.params.id;
        const news = await News.findById(id).populate("user").exec();

        if(!News) {
            return res.status(400).send({
                message: "Noticia não encontrada"
            });
        }

        res.status(200).send({
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            userAvatar: news.user.avatar
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function searchByTitle(req, res) {
    try {
        const title = req.query.title;

        const news = await News.find({
            title: {$regex: `${title || ""}`, $options: "i"}
        })
        .sort({_id: -1})
        .populate("user")
        .exec();

        if(news.length === 0) {
            return res.status(400).send({
                message: "Nenhuma notícia com esse título encontrada"
            })
        }

        res.status(200).send(
            news.map(n => ({
                id: n._id,
                title: n.title,
                text: n.text,
                banner: n.banner,
                likes: n.likes,
                comments: n.comments,
                name: n.user.name,
                username: n.user.username,
                userAvatar: n.user.avatar
            }))
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function byUser(req, res) {
    try {
        const id = req.userId;
        const userNews = await News.find({user: id})
        .sort({_id: -1})
        .populate("user")
        .exec();

        res.status(200).send(userNews.map(n => ({
            id: n._id,
            title: n.title,
            text: n.text,
            banner: n.banner,
            likes: n.likes,
            comments: n.comments,
            name: n.user.name,
            username: n.user.username,
            userAvatar: n.user.avatar
        })));
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function update(req, res) {
    try {
        const {title, text, banner} = req.body;

        if(!title && !text && !banner) {
            return res.status(400).send({message: "Por favor preencha todos os dados"});
        }

        const userId = req.userId;
        const id = req.params.id;
        const news = await News.findById(id).exec();

        if(userId != news.user._id) {
            return res.status(401).send({
                message: "Usuário não autorizado"
            })
        } // conferir se é o mesmo usuário que criou a noticia que sta tentando atualiza-lá

        await News.findByIdAndUpdate(id, req.body).exec();
        
        res.status(200).send({
            message: "Notícia atualizada com sucesso",
            
        });
    } catch (error) {
        res.status(400).send(error.message);        
    }
}

async function destroy(req, res) {
    try {
        const userId = req.userId;
        const id = req.params.id;
        const news = await News.findById(id).exec();

        if(userId != news.user._id) {
            return res.status(401).send({message: "Usuário não autorizado"});
        }

        await News.findByIdAndDelete(id).exec();
        
        res.status(200).send({
            message: "Notícia excluida com sucesso",
            news
        });
    } catch (error) {
        res.status(400).send(error.message);        
        
    }
}

export default {
    create,
    findAll, 
    topNews, 
    findById, 
    searchByTitle, 
    byUser,
    update,
    destroy
};