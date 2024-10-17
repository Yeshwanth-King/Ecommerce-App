import connectDB from "@/lib/connectDB";
import Products from "@/models/products.model";
import { NextResponse } from "next/server";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions)
    await isAdmin(session);
    const data = await req.json();
    console.log("Received data:", data); // Logging received data

    const product = await Products.create(data);
    console.log("Product created:", product); // Logging created product

    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error); // Logging error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
