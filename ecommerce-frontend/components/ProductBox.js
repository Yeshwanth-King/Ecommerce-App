"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartContexts } from "./CartContext";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Eye } from "lucide-react";

const ProductBox = ({ product }) => {
  const { addToCart } = useContext(CartContexts);
  const AddProToCart = (id) => {
    addToCart(id);
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col">
      <Link href={"/products/" + product?._id} className="relative block overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product?.images[0]}
            alt={product?.Name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="flex-1 p-4">
        <Link href={"/products/" + product?._id}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product?.Name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary-600">
            ₹{product?.Price?.toLocaleString()}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => AddProToCart(product._id)}
          className="w-full"
          variant="default"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductBox;
