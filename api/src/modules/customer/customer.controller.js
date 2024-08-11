import { ObjectId } from "mongodb";
import { db } from "../../../DB/db.connection.js"
import bcrypt from "bcrypt";






//1-signup
const signup = async(req,res)=>{
    const {name, email, password, phone} = req.body
    //cheak email existance
    const isEmail = await db.collection('customers').findOne({email})
    if(isEmail){
        return res.status(400).json({message: "Email already exist", sucess: false})
        }
    // hashing password
    const hashedPassword = await bcrypt.hashSync(password, 10)
    // prepare data
    const customer = {
        name,
        email,
        password: hashedPassword,
        phone
        }
    let createCustomer = await db.collection('customers').insertOne(customer)
    res.json({message: "custome created successfully", createCustomer})
}
//2-signin
const signin = async(req,res)=>{
    const {email, password} = req.body
    const customer = await db.collection('customers').findOne({email})
    if(!customer){
        return res.status(400).json({message: "Email not found", sucess: false})
        }
        const isMatch = await bcrypt.compareSync(password, customer.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid password", sucess: false})
            }
            res.json({message: "Login successfully", customer})

}

// 3- Get all customer
const get_all_customers = async (req, res) => {
    try {
        const customers = await db.collection('customers').find().toArray();
        res.json({ message: "Customers found successfully", customers });
        } catch (error) {
            console.error('Error fetching customers:', error);
            res.status(500).json({ message: "Internal server error", success: false });
            }
            };
// 4- Get customer by id
const get_customer_by_id = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found", success: false });
            }
            res.json({ message: "Customer found successfully", customer });
            } catch (error) {
                console.error('Error fetching customer:', error);
                res.status(500).json({ message: "Internal server error", success: false });
                }
            }


//5- Update user (owner only)
const update_customer = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found", success: false });
            }
            const { name, email, password, phone, } = req.body;
            const updatedCustomer = {
                name,
                email,
                password,
                phone
                };
                const result = await db.collection('customers').updateOne({ _id: new ObjectId(id)
                    }, { $set: updatedCustomer });
                    if (result.modifiedCount === 0) {
                        return res.status(400).json({ message: "No fields to update", success: false
                            });
                            }
                            res.json({ message: "Customer updated successfully", customer: updatedCustomer });
                            } catch (error) {
                                console.error('Error updating customer:', error);
                                res.status(500).json({ message: "Internal server error", success: false });
                                }
                            }

//6- Delete user (owner only)
const delete_customer = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found", success: false });
            }
            const result = await db.collection('customers').deleteOne({ _id: new ObjectId(id)
                });
                if (result.deletedCount === 0) {
                    return res.status(400).json({ message: "Customer not found", success: false });
                    }
                    res.json({ message: "Customer deleted successfully" });
                    } catch (error) {
                        console.error('Error deleting customer:', error);
                        res.status(500).json({ message: "Internal server error", success: false });
                        }
                        } 


export{
    signup,
    signin,
    get_all_customers,
    get_customer_by_id,
    update_customer,
    delete_customer
    
} 