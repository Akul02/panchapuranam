import type { Metadata } from "next";
import "../styles/globals.css";

//  components
import LanguageProvider from "../context/LanguageContext";
import Navbar from "../components/layout/Navbar";
import UserProvider from "../context/UserContext";

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
            <UserProvider>
                <Navbar/>
                {children}
            </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
