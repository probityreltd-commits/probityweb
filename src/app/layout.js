import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import UnderConstruction from "@/components/underConstruction/UnderConstruction";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {maintenanceMode ? (
          <UnderConstruction />
        ) : (
          <>
            <Navbar></Navbar>
            {children}
          </>
        )}
      </body>
    </html>
  );
}
