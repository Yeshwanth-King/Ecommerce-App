import connectDB from "@/lib/connectDB";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDB();
        const { ids } = await req.json();

        const products = await Products.find({ _id: { $in: ids } });
        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        console.error("Error adding product:", error); // Logging error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}