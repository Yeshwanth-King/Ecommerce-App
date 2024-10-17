import connectDB from "@/lib/connectDB";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDB();
        const { id } = await req.json();
        // console.log(id)
        const products = await Products.findById(id)
        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        console.error("Error adding product:", error); // Logging error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}