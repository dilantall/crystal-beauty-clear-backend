import Order from "../models/order.js";
//ch
export async function createOrder(req, res) {
    if (req.user == null) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }

    const body = req.body;

    const orderData = {
        orderid: "",   // ← fixed field name
        email: req.user.email,
        name: body.name,
        address: body.address,
        phoneNumber: body.phoneNumber,
        billItems: body.billItems || [],   // ← expects real array of items
        total: body.total || 0             // ← expects total price
    };

    if (orderData.billItems.length === 0 || orderData.total === 0) {
        res.status(400).json({ message: "billItems and total are required" });
        return;
    }

    const lastBills = await Order.find().sort({ _id: -1 }).limit(1);

    if (lastBills.length === 0) {
        orderData.orderid = "ORD0001";
    } else {
        const lastOrderId = lastBills[0].orderid;   // ← fixed field name
        const lastOrderNumber = lastOrderId.replace("ORD", "");
        const newOrderNumberString = String(parseInt(lastOrderNumber) + 1).padStart(4, '0');
        orderData.orderid = "ORD" + newOrderNumberString;
    }

    const order = new Order(orderData);

    try {
        await order.save();
        res.json({ message: "Order saved successfully" });
    } catch (err) {
        console.error("Order Save Error:", err);
        res.status(500).json({ message: "Order not saved", error: err.message });
    }
}
export function getOrders(req,res){
    if(res.user==null){
        res.status(403).json({
            message:"Unauthorized"
        })
        return;
    }
    if(req.user.role=="admin"){
        Order.find().then(

            (orders)=>{
                res.json(orders)
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message:"Orders not found"
                })
            }
        )
    }
    else{
        {
            Order.find({
                email:req.user.email
            }).then(
                (orders)=>{
                    res.json(orders)
                }
            ).catch(
                (err)=>{
                    res.status(500).json({
                        message:"Orders not found"
                    })
                }
            )
        }
    }
}

