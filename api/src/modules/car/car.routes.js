import { Router } from "express";
import { addCar, deleteCar, getAllCars, getCarById, updateCar } from "./car.controller.js";

const carRouter = Router()

carRouter.post('/addCar', addCar)
carRouter.get('/',getAllCars)
carRouter.get('/:id',getCarById)
carRouter.put('/:id',updateCar)
carRouter.delete('/:id',deleteCar)


 
export default carRouter; 