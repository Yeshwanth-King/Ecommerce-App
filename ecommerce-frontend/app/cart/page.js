"use client";
import { CartContexts } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

const page = () => {
  const { cartProducts, addToCart, removeToCart, clearCart } =
    useContext(CartContexts);
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  const isSuccess = window.location.href.includes("success");

  let total = 0;

  for (const productId of cartProducts) {
    let price = product.find((p) => p._id === productId)?.Price || 0;
    total += price;
  }

  const moreProduct = (id) => {
    addToCart(id);
  };

  const lessProduct = (id) => {
    removeToCart(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = cartProducts;
        const response = await axios.post(
          "/api/cart",
          { ids: data },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setProduct(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [cartProducts]);

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess]);

  const goToPayment = async () => {
    // Validation
    if (!name || !email || !address || !city || !state || !pincode) {
      toast.error("Missing information", {
        description: "Please fill in all shipping details",
        duration: 3000,
      });
      return;
    }

    setLoader(true);
    toast.loading("Processing your order...", {
      description: "Redirecting to payment gateway",
      id: "checkout",
    });

    try {
      const response = await axios.post("/api/checkout", {
        name,
        email,
        address,
        city,
        state,
        pincode,
        cartProducts,
      });
      if (response.data.url) {
        toast.success("Redirecting to payment...", {
          id: "checkout",
          description: "Please complete your payment",
          duration: 2000,
        });
        setLoader(false);
        setTimeout(() => {
          window.location = response.data.url;
        }, 500);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed", {
        id: "checkout",
        description: "Something went wrong. Please try again.",
        duration: 4000,
      });
      setLoader(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <div className="flex justify-center mb-6">
                  <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <h1 className="font-bold text-4xl text-gray-900 mb-4">
                  Order Successful!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for your order. We'll send you an email confirmation
                  with tracking details.
                </p>
                <Button size="lg" asChild>
                  <Link href={"/"}>Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          {cartProducts?.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Add some products to get started!
                </p>
                <Button size="lg" asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Shopping Cart ({cartProducts.length} items)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {product?.map((product, index) => {
                      const quantity = cartProducts.filter(
                        (id) => id === product._id
                      ).length;
                      return (
                        <div
                          key={index}
                          className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <Link
                            href={"/products/" + product._id}
                            className="shrink-0"
                          >
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={product.images[0]}
                                fill
                                alt={product.Name}
                                className="object-cover"
                              />
                            </div>
                          </Link>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <Link href={"/products/" + product._id}>
                                <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                                  {product.Name}
                                </h3>
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">
                                ₹{product.Price?.toLocaleString()} each
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() => lessProduct(product._id)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-semibold">
                                  {quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() => moreProduct(product._id)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-4">
                                <p className="text-lg font-bold text-gray-900">
                                  ₹{(product.Price * quantity).toLocaleString()}
                                </p>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => {
                                    // Remove all instances of this product silently
                                    for (let i = 0; i < quantity; i++) {
                                      removeToCart(product._id, false);
                                    }
                                    // Show single toast for the bulk delete
                                    toast.warning("Product removed", {
                                      id: `delete-${product._id}`,
                                      description: `${product.Name} removed from cart`,
                                      duration: 2500,
                                    });
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary-600">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <h3 className="font-semibold text-gray-900">
                        Shipping Information
                      </h3>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Shipping Address"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(ev) => setCity(ev.target.value)}
                        />
                        <Input
                          type="text"
                          placeholder="Pincode"
                          value={pincode}
                          onChange={(ev) => setPincode(ev.target.value)}
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(ev) => setState(ev.target.value)}
                      />
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      onClick={goToPayment}
                      disabled={loader}
                    >
                      {loader ? "Processing..." : "Proceed to Checkout"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
