import { Router } from "express";
import {  delete_customer, get_all_customers, get_customer_by_id, signin, signup, update_customer } from "./customer.controller.js";



const customerRouter = Router()

customerRouter.post('/signup', signup)
customerRouter.post('/signin', signin)
customerRouter.get('/', get_all_customers)
customerRouter.get('/:id', get_customer_by_id)
customerRouter.put('/:id', update_customer)
customerRouter.delete('/:id', delete_customer)





export default customerRouter