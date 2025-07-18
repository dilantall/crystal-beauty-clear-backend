import Product from "../models/product.js";

export function createProduct(req, res) {
    if (req.user == null) {
        return res.status(403).json({ message: "You need to login first" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to create a product" });
    }

    const newProduct = new Product(req.body);

    newProduct.save()
        .then(() => {
            res.json({ message: "Product Saved Successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Product not Saved" });
        });
}

export function getProducts(req, res) {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Products not Found" });
        });
}

export function deleteProduct(req, res) {
    if (req.user == null) {
        return res.status(403).json({ message: "You need to login first" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to delete a product" });
    }

    Product.findOneAndDelete({ productID: req.params.productId })    // ✅ Correct field name
        .then((deletedProduct) => {
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Product not deleted" });
        });
}

export function updateProduct(req, res) {
    if (req.user == null) {
        return res.status(403).json({ message: "You need to login first" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to update a product" });
    }

    Product.findOneAndUpdate({
         productID: req.params.productID
        }, req.body).then(
            () => {
                res.json({
                    message:"Product updated succesfully"
               
        })
    }
).catch(
    (err) => {
            
            res.status(500).json({
                 message: "Product not updated" });
        });
}
