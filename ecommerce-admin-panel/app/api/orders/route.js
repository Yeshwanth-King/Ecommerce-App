import Order from "@/models/orders";
import { NextResponse } from "next/server";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/connectDB";

export async function GET(req, res) {
    try {
        const session = await getServerSession(authOptions)
        await isAdmin(session);
        await connectDB();

        let order = await Order.find().sort({ createdAt: -1 });
        return NextResponse.json(order);
    } catch (error) {
        console.error("Error:", error); // Logging error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
