import mongoose from "mongoose";


// make img url required here and pass the 1st product img url in order object

const orderSchema = new mongoose.Schema({
    userId:String,
    subTotal: {
        type: Number,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    phoneNumber:{
        type : String,
        required : true
    }
    
},{timeStamps:true});


const Order = mongoose.model("Order",orderSchema);

export default Order;

