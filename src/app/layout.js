import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import UnderConstruction from "@/components/underConstruction/UnderConstruction";

import { Toaster } from "sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "Probity Holdings - Modern Real Estate Platform",
  description:
    "Probity is building a modern real estate platform to help you discover, buy, rent, and sell properties with ease.",
};

export default function RootLayout({ children }) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col selection:bg-[#3b1a83] selection:text-white">
        {maintenanceMode ? (
          <UnderConstruction />
        ) : (
          <>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </>
        )}
      </body>
    </html>
  );
}
