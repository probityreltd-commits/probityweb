import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import UnderConstruction from "@/components/underConstruction/UnderConstruction";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Probity | Coming Soon",
  description:
    "Probity is building a modern real estate platform to help you discover, buy, rent, and sell properties with ease. Stay tuned for our official launch.",
};

export default function RootLayout({ children }) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        {maintenanceMode ? (
          <UnderConstruction />
        ) : (
          <>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
            <Toaster position="top-right" richColors closeButton />
          </>
        )}
      </body>
    </html>
  );
}
