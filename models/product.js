import mongoose from "mongoose";

const productSchema=new mongoose.Schema({

    productID:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    altNames:{
        type:[String],
        default:[]
    },
    price:{
        type:Number,
        required:true
    },
    labelPrice:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        default:["https://m.media-amazon.com/images/I/31enpjzT4ML.AC_SX250.jpg"]
    },
    stock:{
        type:Number,
        required:true
    },
})

const product=mongoose.model("product",productSchema)
export default product;