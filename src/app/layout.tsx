import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/lib/cart-context";

const TITLE = "Lamara Coffee & Kitchen | Organic Café in Mid City, New Orleans";
const DESCRIPTION =
  "An all-organic, West Coast-inspired café in Mid City New Orleans serving espresso drinks, organic teas, healthy vegetarian small plates, a full smoothie bar, and gluten-free house-made baked goods. Vegan, vegetarian, and gluten-free options daily — order online for pickup.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lamaracoffee.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Lamara Coffee & Kitchen",
    type: "website",
    images: [{ url: "/images/brand/latte-art.webp", width: 1136, height: 1420 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/brand/latte-art.webp"],
  },
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
      </body>
    </html>
  );
}
