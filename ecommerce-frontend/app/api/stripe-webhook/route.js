// app/api/stripe-webhook/route.js
import { NextResponse } from 'next/server';
import { buffer } from 'micro';
import Stripe from 'stripe';
import connectDB from '@/lib/connectDB';
import Order from '@/models/orderSchema';

const stripe = new Stripe(process.env.STRIPE_SK, { apiVersion: '2022-11-15' });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
    await connectDB();

    const sig = request.headers.get('stripe-signature');
    const reqBuffer = await request.arrayBuffer();
    const buf = Buffer.from(reqBuffer);

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.order_id;
            const paid = data.payment_status === 'paid';
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, { paid: true });
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
