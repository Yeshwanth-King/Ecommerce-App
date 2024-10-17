const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    line_items: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    paid: Boolean
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order;