import { Inter } from "next/font/google";
import "./globals.css";
import { CardContextProvider } from "@/components/CartContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopy",
  description: "Get whatever you want under your fingertip",
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
