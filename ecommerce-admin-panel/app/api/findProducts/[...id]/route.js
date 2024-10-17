import connectDB from "@/lib/connectDB";
import Products from "@/models/products.model";
import { NextResponse } from "next/server";
import { authOptions, isAdmin } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req, res) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)
        await isAdmin(session);
        let url = req.url
        let arr = url.split('/')
        let index = arr.length - 1
        let id = arr[index]
        let products = await Products.findById(id);
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error adding product:", error); // Logging error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req, res) {
    try {
        const session = await getServerSession(authOptions)
        await isAdmin(session);
        await connectDB();
        const data = await req.json();
        console.log("Received data:", data); // Logging received data

        let url = req.url
        let arr = url.split('/')
        let index = arr.length - 1
        let id = arr[index]
        let product = await Products.findByIdAndUpdate(id, data);
        console.log("Product before Update:", product)
        console.log("Product after Update:", data); // Logging created product

        return NextResponse.json({ message: "Product added successfully, " + data });
    } catch (error) {
        console.error("Error adding product:", error); // Logging error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function DELETE(req, res) {
    try {
        const session = await getServerSession(authOptions)
        await isAdmin(session);
        await connectDB();
        const id = await req.json();
        console.log("Received data:", id); // Logging received data

        let product = await Products.findByIdAndDelete(id);
        console.log("Product Deleted successfully", product)

        return NextResponse.json({ message: "Product deleted successfully " });
    } catch (error) {
        console.error("Error adding product:", error); // Logging error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
