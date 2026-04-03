import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider"; // Agar 'store' folder hai, path adjust kar lein
import ClientWrapper from "@/components/layout/ClientWrapper";

export const metadata = {
  title: "Kalakaar Ventures | Selected Work",
  description: "Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.",
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
          </ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}