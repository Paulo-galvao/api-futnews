import e from "express";
import globalMiddlewares from "../middlewares/global.middlewares.js";
import userControllers from "../controllers/user.controller.js";

const {validateId, validateUser, validateUserData, validateUserDataToUpdate} = globalMiddlewares;
const {create, findAll, findById, update} = userControllers;
const router = e.Router();

router.post('/',validateUserData, create);
router.get('/', findAll);
router.get('/:id', validateId, validateUser, findById);
router.patch('/:id', validateId, validateUser, validateUserDataToUpdate, update);

export default router;