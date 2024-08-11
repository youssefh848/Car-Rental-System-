import { Router } from "express";
import { add, getAllRentals, updateRental } from "./rental.controller.js";



const rentalRouter = Router()

rentalRouter.post('/add',add)
rentalRouter.get('/',getAllRentals)
rentalRouter.put('/',updateRental)




export default rentalRouter;