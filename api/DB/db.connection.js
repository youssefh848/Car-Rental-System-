import { MongoClient } from "mongodb";

// Connection URL
const client = new MongoClient('mongodb+srv://youssef:8EbJnveELjKzvj95@cluster0.rt3oe.mongodb.net/');

  // Use connect method to connect to the server
 client.connect().then(()=> {
    console.log('Connected to MongoDB')
 }).catch(()=>{
    console.log('Error connecting to MongoDB')
 })
//conect to db
export const db = client.db("carRental");     

