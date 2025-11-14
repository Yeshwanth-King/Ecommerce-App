import AllProducts from "@/components/AllProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">All Products</h1>
            <p className="text-lg text-gray-600">Explore our complete collection of premium products</p>
          </div>
          <AllProducts products={allProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
