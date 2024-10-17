import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  description: { type: String, required: true },
  Price: { type: Number, required: true },
  images: { type: [String] },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  properties: { type: Object },
}, { timestamps: true });

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
