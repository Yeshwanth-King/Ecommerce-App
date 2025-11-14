import { Inter } from "next/font/google";
import "./globals.css";
import { CardContextProvider } from "@/components/CartContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce Store - Shop Premium Products",
  description: "Discover our curated collection of premium products. Fast shipping, secure checkout, and amazing customer service.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CardContextProvider>
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            expand={true}
            closeButton
          />
        </CardContextProvider>
      </body>
    </html>
  );
}
