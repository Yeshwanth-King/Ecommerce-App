"use client";
import { CartContexts } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

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
  let product;

  useEffect(() => {
    const fectdata = async () => {
      const data = { id: params.id };
      let response = await axios.post("/api/findProduct", data);
      console.log(response.data);
      setData(response.data);
      return response.data;
    };
    fectdata();
  }, []);

  const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 40px;
    margin-top: 30px;
    @media (max-width: 768px) {
    grid-template-columns: 1fr; // Single column for smaller screens
    gap: 30px; // Adjust gap for smaller screen sizes
  }
  `;
  const { addToCart } = useContext(CartContexts);

  const AddProToCart = (id) => {
    addToCart(id);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Center>
        <Wrapper>
          <div className=" bg-white flex flex-col gap-5 justify-center items-center p-10 rounded-xl">
            <ProductImages images={data.products?.images} />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-extrabold">{data.products?.Name}</h1>
            <p className="text-gray-500">{data.products?.description}</p>
            <div className=" flex gap-10 items-center p-2">
              <p className="text-3xl font-bold">₹{data.products?.Price}</p>
              <button
                onClick={() => {
                  AddProToCart(data.products?._id);
                }}
                className="border-2 border-blue-500 font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 py-1 px-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Wrapper>
      </Center>
    </div>
  );
};

export default page;
