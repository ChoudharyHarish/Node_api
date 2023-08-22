import Order from "../Models/order.js";


const getOrderDetails = async(req,res) => {
    const {userId} = req.user;
    try{
        const orders = await Order.find({userId});
        return res.status(202).json(orders);
    }
    catch(error){
        if(!userId){
        return res.status(404).json("Token Expired Please login Again");
        }
        res.status(500).json("Something Bad Happen Try Again Later");
    }
}

const getSpecificOrder = async(req,res)=>{

    const {userId} = req.user;
    const {id} = req.params;
    try{
        const order = await Order.findOne({userId,_id:id});
        return res.status(202).json(order);
    }
    catch(error){
        return res.status(500).json("Something Bad Happen Try Again Later");
    }
}


const recordOrder = async(req,res) => {
        const {subTotal,phoneNumber} = req.body;
        const {userId} = req.user;
        try{
            const order = await Order.create({subTotal,userId,phoneNumber});
            return res.status(202).json(order);
        }
        catch(error){
            // console.log(error);
            return res.status(500).json("Something Bad Happen Try Again Later");
        }
}


export {getOrderDetails,recordOrder,getSpecificOrder}