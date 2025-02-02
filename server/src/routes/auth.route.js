import {Router} from "express";
import authControllers from "../controllers/auth.controller.js"

const {login} = authControllers;

const router = Router();

router.post('/', login);

export default router;