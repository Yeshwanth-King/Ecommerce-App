"use client";
import { CartContexts } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const ColoumWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr; // Default two-column layout
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Single column for smaller screens
    gap: 20px; // Adjust gap for smaller screen sizes
  }
`;


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
        const response = await axios.post("/api/cart", { ids: data }, {
          headers: { "Content-Type": "application/json" },
        });
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
    setLoader(true);
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
        setLoader(false);
        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setLoader(false);
    }
  };


  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Header />
        <Center>
          <div className="bg-white px-2 rounded-xl py-5 flex flex-col justify-center items-center gap-2 h-full">
            <h1 className="font-bold text-4xl text-center">Thanks For Ordering!</h1>
            <p className="text-gray-400 text-center">
              We will Email you when your order will be delivered.
            </p>
            <div className="mt-5">
              <Link href={"/"} className="bg-black mt-5 text-white rounded-lg px-2 py-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </Center>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Center>
        <ColoumWrapper>
          <div className="bg-white px-2 rounded-xl py-5 flex flex-col gap-2 h-full">
            {cartProducts?.length === 0 && <div>Your Cart is empty</div>}
            {cartProducts?.length > 0 && (
              <>
                <h2 className="font-bold text-3xl text-center">Cart</h2>
                {product?.map((product, index) => {
                  return (
                    <div key={index} className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="space-y-6">
                          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <Link href={"/"} className="shrink-0 md:order-1">
                                <Image
                                  src={product.images[0]}
                                  width={100}
                                  height={100}
                                  priority
                                  alt={product.Name}
                                />
                              </Link>

                              <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    id="decrement-button"
                                    onClick={() => {
                                      lessProduct(product._id);
                                    }}
                                    data-input-counter-decrement="counter-input"
                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                  >
                                    <svg
                                      className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  </button>
                                  <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                                    {
                                      cartProducts.filter((id) => id === product._id)
                                        .length
                                    }
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      moreProduct(product._id);
                                    }}
                                    id="increment-button"
                                    data-input-counter-increment="counter-input"
                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                  >
                                    <svg
                                      className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <div className="text-end md:order-4 md:w-32">
                                  <p className="text-base font-bold text-gray-900 dark:text-white">
                                    ₹
                                    {product.Price *
                                      cartProducts.filter((id) => id === product._id)
                                        .length}
                                  </p>
                                </div>
                              </div>

                              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                <Link
                                  href={"/"}
                                  className="text-base font-medium text-gray-900 dark:text-white"
                                >
                                  {product.Name}
                                </Link>

                                <div className="flex items-center gap-4">
                                  <button
                                    type="button"
                                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                  >
                                    <svg
                                      className="me-1.5 h-5 w-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                      />
                                    </svg>
                                    Add to Favorites
                                  </button>

                                  <button
                                    type="button"
                                    className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-500"
                                  >
                                    <svg
                                      className="me-1.5 h-5 w-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18 17.94 6M18 18 6.06 6"
                                      />
                                    </svg>
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between p-4 border-t-2">
                  <span className="font-semibold text-2xl">Total</span>
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    ₹{total}
                  </span>
                </div>
              </>
            )}
          </div>
          {cartProducts?.length > 0 && (
            <div className="bg-white px-2 rounded-xl py-5 flex flex-col gap-2 h-full">
              <h2 className="text-xl font-semibold text-center">Order Information</h2>
              <input
                type="text"
                className="border-2 px-3 py-2 rounded-lg w-full"
                placeholder="Name"
                value={name}
                required
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <input
                type="email"
                className="border-2 px-3 py-2 rounded-lg w-full"
                placeholder="Email"
                value={email}
                required
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                type="text"
                className="border-2 px-3 py-2 rounded-lg w-full"
                placeholder="Address"
                value={address}
                required
                name="address"
                onChange={(ev) => setAddress(ev.target.value)}
              />
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  className="border-2 px-3 py-2 rounded-lg w-full"
                  placeholder="City"
                  value={city}
                  required
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <input
                  type="text"
                  className="border-2 px-3 py-2 rounded-lg w-full"
                  placeholder="Pincode"
                  value={pincode}
                  required
                  name="pincode"
                  onChange={(ev) => setPincode(ev.target.value)}
                />
              </div>
              <input
                type="text"
                className="border-2 px-3 py-2 rounded-lg w-full"
                placeholder="State"
                value={state}
                required
                name="state"
                onChange={(ev) => setState(ev.target.value)}
              />
              <input
                type="hidden"
                value={cartProducts.join(",")}
                required
                name="products"
              />
              <button
                type="submit"
                onClick={() => {
                  goToPayment();
                }}
                className={
                  "bg-black text-white rounded-lg px-2 py-2" +
                  (loader ? " cursor-progress" : "")
                }
              >
                Continue to Payment
              </button>
            </div>
          )}
        </ColoumWrapper>

      </Center>
    </div>
  );
};

export default page;
