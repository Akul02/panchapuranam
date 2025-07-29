import type { Metadata } from "next";
import "../styles/globals.css";

//  components
import LanguageProvider from "../context/LanguageContext";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Panchapuranam Home",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="background">
        <LanguageProvider>
            <Navbar/>
            {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
