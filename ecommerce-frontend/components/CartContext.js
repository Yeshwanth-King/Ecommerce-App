"use client";
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

export const CartContexts = createContext({});

export function CardContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const ls = typeof window === "undefined" ? null : window.localStorage;
    if (ls) {
      const storedCart = JSON.parse(ls.getItem("cart"));
      if (storedCart) {
        setCartProducts(storedCart);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, isMounted]);

  const addToCart = (id) => {
    setCartProducts((prev) => [...prev, id]);
    toast.success("Added to cart!", {
      id: `add-${id}-${Date.now()}`,
      description: "Product has been added to your cart",
      duration: 3000,
    });
  };

  if (!isMounted) {
    return null; // Or a loading spinner, or any fallback content.
  }

  const removeToCart = (id, showToast = true) => {
    setCartProducts((prev) => {
      const index = prev.indexOf(id);
      if (index !== -1) {
        if (showToast) {
          toast.info("Removed from cart", {
            id: `remove-${id}-${Date.now()}`,
            description: "Product quantity decreased",
            duration: 2000,
          });
        }
        return prev.filter((item, i) => i !== index);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    toast.success("Cart cleared!", {
      description: "All items removed from your cart",
      duration: 2000,
    });
  };
  return (
    <CartContexts.Provider
      value={{ cartProducts, addToCart, removeToCart, clearCart }}
    >
      {children}
    </CartContexts.Provider>
  );
}
