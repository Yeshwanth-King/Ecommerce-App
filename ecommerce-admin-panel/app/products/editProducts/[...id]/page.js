"use client";
import React from "react";
import LayoutMain from "@/components/MainLayout";
import { HiChevronLeft } from "react-icons/hi2";
import Link from "next/link";
import { Toaster } from "sonner";
import ProductForm from "@/components/ProductForm";


const editPro = () => {


  return (
    <LayoutMain>
      <div className="flex flex-col bg-red-50 h-screen overflow-hidden">
        <Toaster closeButton position="top-right" richColors />
        <span className="p-3 flex justify-between shadow-sm bg-white">
          <Link
            href={"/products"}
            className="text-sm flex justify-center items-center bg-blue-600 px-3 pl-2 py-1 group hover:bg-blue-700 rounded-full text-white"
          >
            <span className="flex gap-1 justify-center items-center">
              <HiChevronLeft className="text-lg" />
              <span>Back</span>
            </span>
          </Link>
          <span className="text-2xl font-bold"> Edit Product</span>
          <span></span>
        </span>
        <ProductForm />
      </div>
    </LayoutMain>
  );
};

export default editPro;
