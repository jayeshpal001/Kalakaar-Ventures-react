import { Analytics } from "@vercel/analytics/react"; // Analytics Engine Import
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider"; 
import ClientWrapper from "@/components/layout/ClientWrapper";

// YAHAN APNA LIVE DOMAIN DALIYE (e.g., https://kalakaar-next.vercel.app)
const SITE_URL = "https://www.kalakaarventures.in"; 

export const metadata = {
  title: "Kalakaar Ventures | Selected Work",
  description: "Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.",
  metadataBase: new URL(SITE_URL),
  
  // PROTOCOL 1: THE SOCIAL GRAPH (WhatsApp/LinkedIn Thumbnail)
  openGraph: {
    title: "Kalakaar Ventures | Selected Work",
    description: "Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.",
    url: SITE_URL,
    siteName: "Kalakaar Ventures",
    images: [
      {
        url: "/og-image.jpg", // Aapka 1200x630 ka premium banner public folder mein
        width: 1200,
        height: 630,
        alt: "Kalakaar Ventures Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalakaar Ventures | Selected Work",
    description: "Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.",
    images: ["/og-image.jpg"],
  },

  icons: {
    // ?v=2 lagane se browser isko nayi file samjhega aur purani bhool jayega
    icon: '/icon.png?v=2', 
    shortcut: '/icon.png?v=2',
    apple: '/kv.png?v=2',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white custom-scrollbar antialiased">
        <ReduxProvider>
          {/* Client Wrapper saari UI functionalities handle karega */}
          <ClientWrapper>
            {children}
            
            {/* PROTOCOL 2: THE ANALYTICS RADAR */}
            <Analytics />
          </ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}