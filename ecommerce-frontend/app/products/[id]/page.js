"use client";
import { CartContexts } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImages from "@/components/ProductImages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { ShoppingCart, Package, Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const page = () => {
  const [data, setData] = useState({
    _id: "",
    Name: "",
    Price: "",
    category: "",
    description: "",
    images: [],
  });
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fectdata = async () => {
      const data = { id: params.id };
      try {
        let response = await axios.post("/api/findProduct", data);
        console.log(response.data);
        setData(response.data);
        return response.data;
      } catch (error) {
        toast.error('Failed to load product', {
          description: 'Could not fetch product details',
          duration: 3000,
        });
      }
    };
    fectdata();
  }, []);

  const { addToCart } = useContext(CartContexts);

  const AddProToCart = (id) => {
    addToCart(id);
  };

  const handleBuyNow = (id) => {
    addToCart(id);
    toast.success('Added to cart!', {
      description: 'Redirecting to checkout...',
      duration: 2000,
    });
    setTimeout(() => {
      router.push('/cart');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm">
            <ProductImages images={data.products?.images} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Package className="w-3 h-3 mr-1" />
                In Stock
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {data.products?.Name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.products?.description}
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary-600">
                ₹{data.products?.Price?.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ₹{((data.products?.Price || 0) * 1.2).toLocaleString()}
              </span>
              <Badge variant="destructive">20% OFF</Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 text-base"
                onClick={() => {
                  AddProToCart(data.products?._id);
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 text-base"
                onClick={() => handleBuyNow(data.products?._id)}
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Free Delivery</h3>
                      <p className="text-sm text-gray-600">On orders above ₹500</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                      <p className="text-sm text-gray-600">100% secure transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                      <p className="text-sm text-gray-600">7 days return policy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
