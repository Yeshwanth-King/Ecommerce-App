import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }]
});

const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
