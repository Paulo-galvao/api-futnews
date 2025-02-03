import e from "express";
import newsController from "../controllers/news.controller.js";

const router = e.Router();
const {create, findAll} = newsController;

router.post('/', create);
router.get('/', findAll);

export default router;