import { ObjectId } from "mongodb"
import { db } from "../../../DB/db.connection.js"



// add rental

const add = async (req, res) => {
    
      const { customerId, carId, rentalDate, returnDate } = req.body;
  
      // Validate IDs
      if (!ObjectId.isValid(customerId) || !ObjectId.isValid(carId)) {
        return res.status(400).json({ message: "Invalid customer or car ID" });
      }
    
  
      // Check if the customer exists
      const isUser = await db.collection('customers').findOne({ _id: new ObjectId(customerId) });
      if (!isUser) {
        return res.status(404).json({ message: "Customer does not exist" });
      }
  
      // Check if the car exists
      const isCar = await db.collection('cars').findOne({ _id: new ObjectId(carId) });
      if (!isCar) {
        return res.status(404).json({ message: "Car does not exist" });
      }
  
      // Check if the car is available for rent                               >>>>>>>> في مشكله هنا يهندسه بيتشك هنا ومبيعديش <<<<<<<<<<                        
       if (isCar.rentalStatus !== "available") {                           
        return res.status(400).json({ message: "Car is currently rented, please try again later" });
      }
   
      // Update the car's rental status to 'rented'
      await db.collection('cars').updateOne(
        { _id: new ObjectId(carId) },
        { $set: { rentalStatus: "rented" } }
      );
  
      // Insert the rental record
      const rentalRecord = {
        customerId: new ObjectId(customerId),
        carId: new ObjectId(carId),
        rentalDate,
        returnDate  
      };
  
      await db.collection('rentals').insertOne(rentalRecord);
  
      // Return success response
      return res.json({ message: "Car rented successfully" });
  
    
  };


// get all rental 
const getAllRentals = async(req,res)=>{
    const rentals = await db.collection('rentals').find().toArray();
    res.json(rentals);
}

//update rental
const updateRental = async (req, res) => {
    const rentalId = req.params.rentalId;
    const rental = req.body;
    const updatedRental = await db.collection('rentals').updateOne(
        { _id: new ObjectId(rentalId) },
        { $set: rental }
        );
        res.json(updatedRental);
        }


export{
    add,
    getAllRentals,
    updateRental
}