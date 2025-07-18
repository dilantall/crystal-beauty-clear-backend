import express from "express";
import product from "../models/product.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productControoler.js";

const productRouter=express.Router();

productRouter.post("/",createProduct);
productRouter.get("/",getProducts);
productRouter.delete("/:productId",deleteProduct);
productRouter.put("/:productID",updateProduct)

export default productRouter