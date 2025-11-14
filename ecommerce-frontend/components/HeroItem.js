"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartContexts } from "./CartContext";
import { Button } from "./ui/button";
import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";

const HeroItem = ({ product }) => {
  const { addToCart } = useContext(CartContexts);

  const addFeaturedPro = (id) => {
    addToCart(id);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-6 text-white">
            <Badge variant="secondary" className="w-fit">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured Product
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {product.Name}
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
              {product.description}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <span className="text-3xl md:text-4xl font-bold">
                ₹{product.Price?.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => addFeaturedPro(product._id)}
                className="text-base shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add To Cart
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="text-base text-white border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Link
                  href={"/products/" + product._id}
                  className="flex items-center"
                >
                  View Details
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <Link href={"/products/" + product._id} className="block">
              <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src={product.images[0]}
                  fill
                  alt={product.Name}
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroItem;
