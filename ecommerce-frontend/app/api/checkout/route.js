import connectDB from "@/lib/connectDB";
import Order from "@/models/orderSchema";
import Products from "@/models/products";
import { NextResponse } from "next/server";
import Stripe from 'stripe';


export async function POST(req, res) {

    const stripe = new Stripe(process.env.STRIPE_SK);


    console.log("POST request")
    let data = await req.json()

    const { name, email, address, city, state, pincode, cartProducts } = data


    const productID = cartProducts
    const unquieID = [...new Set(productID)]

    await connectDB();

    const productInfo = await Products.find({ _id: { $in: unquieID } })

    let line_items = []

    for (const productID of unquieID) {
        const indo = productInfo.find((product) => product._id == productID)
        const quantity = cartProducts.filter((item) => item == productID).length
        line_items.push({
            quantity: quantity, price_data: {
                currency: "INR",
                product_data: { name: indo.Name },
                unit_amount: quantity * indo.Price * 100
            }
        })
    }

    let orderDoc = await Order.create({
        line_items: line_items, name, email, address, city, state, pincode, paid: false
    })

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        customer_email: email,
        success_url: process.env.PUBLIC_URL + "/cart?success=1",
        cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
        metadata: { order_id: orderDoc._id.toString() }
    })




    return NextResponse.json({ url: session.url });
}