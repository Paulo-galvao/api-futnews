import e from "express";
import newsController from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = e.Router();
const {create, findAll, topNews, findById, searchByTitle, byUser, update, destroy} = newsController;

router.post('/', authMiddleware, create);

router.get('/', findAll);
router.get('/top', topNews);
router.get('/search', searchByTitle);
router.get('/byuser', authMiddleware, byUser);
router.get('/:id', authMiddleware, findById);

router.patch('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, destroy);

export default router;