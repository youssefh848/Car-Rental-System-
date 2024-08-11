import { db } from "../../../DB/db.connection.js"



//1- Get all cars whose model is ‘Honda’ and ‘Toyota’ (using query params) 
const special_1 = async(req,res)=>{
    const cars = await db.collection("cars").find({
        name:{$in:["Honda","Toyota"]}}).toArray()
      if(!cars.length) {
        return res.status(404).json({ message: "No cars found" });
        }
        res.json(cars)
}

//2- Get Available Cars of a Specific Model.
const special_2 = async(req,res)=>{
    const cars = await db.collection("cars").find({name: req.query.name, rentalStatus: "available"}).toArray()
    if(!cars.length) {
        return res.status(404).json({ message: "No cars found" });
        }
        res.json(cars)
}
//3-Get Cars that are Either rented or of a Specific Model. 
const special_3 = async(req,res)=>{
    const cars = await db.collection("cars").find({
        $or: [
            {rentalStatus: "rented"},
            {name: req.query.name}
            ]
    }).toArray()
    if(!cars.length) {
        return res.status(404).json({ message: "No cars found" });
        }
        res.json(cars)
}

//4- Get Available Cars of Specific Models or Rented Cars of a Specific Model
const special_4 = async(req,res)=>{
    const cars = await db.collection("cars").find({
        $or: [
            {name: req.query.name, rentalStatus: "available"},
            {name: req.query.name, rentalStatus: "rented"},
            {rentalStatus: "available", name: req.query.name}
            ]
            }).toArray()
            if(!cars.length) {
                return res.status(404).json({ message: "No cars found" });
                }
                res.json(cars)
}
 

export{
    special_1,
    special_2,
    special_3,
    special_4
} 