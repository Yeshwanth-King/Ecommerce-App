import AllProducts from "@/components/AllProducts";
import Header from "@/components/Header";
import connectDB from "@/lib/connectDB";
import Products from "@/models/products";
import React from "react";

const page = async () => {
  await connectDB();
  const products = await Products.find({}, null, { sort: { _id: -1 } });
  //   console.log(products);
  //   console.log(product);

  const allProducts = products.map((product) => {
    return {
      _id: product._id.toString(),
      Name: product.Name,
      description: product.description,
      Price: product.Price,
      images: product.images,
      category: product.category.toString(), // or other conversion if necessary
      properties: product.properties,
      updatedAt: product.updatedAt.toISOString(), // Ensure Date is converted to string
    };
  })

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-[1200px] mx-auto p-5">
        <h1 className="text-3xl font-bold">All Products</h1>
        <AllProducts products={allProducts} />
      </div>
    </div>
  );
};

export default page;
