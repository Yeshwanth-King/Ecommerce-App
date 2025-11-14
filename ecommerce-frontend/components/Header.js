"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { CartContexts } from "./CartContext";
import Logo1 from "../public/Logo.svg";
import Image from "next/image";
import { ShoppingCart, Menu, X, Home, Package, Grid, User } from "lucide-react";
import { Badge } from "./ui/badge";

const Header = () => {
  const { cartProducts } = useContext(CartContexts);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/categories", label: "Categories", icon: Grid },
    { href: "/account", label: "Account", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image src={Logo1} width={120} height={40} alt="Logo" priority className="object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-primary-600 transition-all"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-all ml-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartProducts?.length > 0 && (
                <Badge variant="secondary" className="ml-1 bg-white text-primary-600">
                  {cartProducts.length}
                </Badge>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-primary-600 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartProducts?.length > 0 && (
                <Badge variant="secondary" className="ml-auto bg-white text-primary-600">
                  {cartProducts.length}
                </Badge>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
