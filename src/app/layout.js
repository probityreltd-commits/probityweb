import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
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

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-W88JTQ6T";

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* dataLayer init (GTM-এর আগেই তৈরি থাকবে) */}
        <Script id="gtm-datalayer-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}

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
