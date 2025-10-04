import { Inter } from "next/font/google";
import "./globals.css";
import { CardContextProvider } from "@/components/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopy",
  description: "Get whatever you want under your fingertip",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-slate-200">
          <CardContextProvider>
            {children}
          </CardContextProvider>
        </div>
      </body>
    </html>
  );
}
