import type { Metadata } from "next";
import "../styles/globals.css";

//  components
import LanguageProvider from "../context/LanguageContext";

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
            {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
