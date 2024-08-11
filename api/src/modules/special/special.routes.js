import { Router } from "express";
import { special_1, special_2, special_3, special_4 } from "./special.controller.js";


const specialRouter = Router();

specialRouter.get('/1',special_1)
specialRouter.get('/2',special_2)
specialRouter.get('/3',special_3)
specialRouter.get('/4',special_4)






export default specialRouter;