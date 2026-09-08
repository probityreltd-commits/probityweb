import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import UnderConstruction from "@/components/underConstruction/UnderConstruction";

import { Toaster } from "sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
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
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
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
