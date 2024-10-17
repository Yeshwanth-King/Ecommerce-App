"use client"
import { createContext, useState, useEffect } from "react";

export const CartContexts = createContext({});

export function CardContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const ls = typeof window === 'undefined' ? null : window.localStorage;
        if (ls) {
            const storedCart = JSON.parse(ls.getItem('cart'));
            if (storedCart) {
                setCartProducts(storedCart);
            }
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            window.localStorage.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts, isMounted]);

    const addToCart = (id) => {
        setCartProducts((prev) => [...prev, id]);
    };

    if (!isMounted) {
        return null; // Or a loading spinner, or any fallback content.
    }

    const removeToCart = (id) => {
        setCartProducts((prev) => {
            const index = prev.indexOf(id);
            if (index !== -1) {
                return prev.filter((item, i) => i !== index);
            }
            return prev;
        });
    }

    const clearCart = () => {
        setCartProducts([]);
    }
    return (
        <CartContexts.Provider value={{ cartProducts, addToCart, removeToCart, clearCart }}>
            {children}
        </CartContexts.Provider>
    );
}
