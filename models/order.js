import mongoose from "mongoose"

const orderSchema=new mongoose.Schema({

    orderid:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:String,
        required:true,
        default:Date.now

    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    phoneNumber:{
        type:String,
        required:true
    },
    billItems:{
        type:[
            {
                productId:String,
                productName:String,
                image:String,
                quantity:Number,
                price:Number
            }
        ],
        required:true
    },
    total:{
        type:Number,
        required:true
    }
})

const order=mongoose.model("orders",orderSchema)
export default order;
