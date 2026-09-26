import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import UnderConstruction from "@/components/underConstruction/UnderConstruction";
import SmoothScroll from "@/components/ui/SmoothScroll";

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
  title: "Apartments for Sale in Bogura | Probity Real Estate",
  description:
    "Looking for a flat in Bogura? Probity Real Estate builds safe, quality apartments in Jamil Nagar, Sherpur Road and more. Visit us today.",
};

export default function RootLayout({ children }) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col selection:bg-[#3b1a83] selection:text-white">
        <SmoothScroll>
          {maintenanceMode ? (
            <UnderConstruction />
          ) : (
            <>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </>
          )}
        </SmoothScroll>
      </body>
    </html>
  );
}
