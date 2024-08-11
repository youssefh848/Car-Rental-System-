import { ObjectId } from "mongodb";
import { db } from "../../../DB/db.connection.js";




//1- Add car
const addCar = async(req,res)=>{
    const{name, model} = req.body;
    //preper data
    const car = 
    {
        name,
        model,
        rentalStatus: "available"
        }
        //add to db
        const addCar = await db.collection('cars').insertOne(car)
        res.json({message: "car added sucessfully",addCar})

}

//2- get all cars
const getAllCars = async(req,res)=>{
    const cars = await db.collection('cars').find().toArray()
    res.json(cars)
    }

//3- get car by id
const getCarById = async(req,res)=>{
    const id = req.params.id
    const car = await db.collection('cars').findOne({ _id: new ObjectId(id) })
    if(!car){
        return res.status(404).json({message: "car not found", success: false})
    }
    res.json({message: "car found sucessfully", car})
}

//4- update car
const updateCar = async(req,res)=>{
    const id = req.params.id
    const{name, model, rental_status} = req.body;
    const car = await db.collection('cars').findOneAndUpdate({ _id: new ObjectId(id)
        },{$set:{
            name,
            model,
            rental_status
            }}
            )
            res.json({message: "car updated sucessfully", car})
            }

//5- delete car
const deleteCar = async(req,res)=>{
    const id = req.params.id
    const car = await db.collection('cars').deleteOne({ _id: new ObjectId(id)})
    res.json({message: "car deleted sucessfully", car})
}



export{
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
}