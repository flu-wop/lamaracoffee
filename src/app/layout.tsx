import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import PreviewBadge from "@/components/layout/PreviewBadge";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Lamara Coffee & Kitchen | Organic Cafe in Mid City, New Orleans",
  description:
    "Organic, plant-forward coffee and kitchen in Mid City New Orleans, next door to Esplanade Studios. Order food, coffee, and smoothies online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <PreviewBadge />
      </body>
    </html>
  );
}
