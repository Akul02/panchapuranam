import type { Metadata } from "next";
import "../styles/globals.css";

//  components
import LanguageProvider from "../context/LanguageContext";
import UserProvider from "../context/UserContext";
import { getUserSessionServer } from "../api/server/authServer";
import { merriweather, notoSerif, sourceSans } from "../components/ui/fonts";
import { getApiData } from "../lib/api/apiData";

export const metadata: Metadata = {
  title: "Panchapuranam Home",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getApiData(getUserSessionServer());

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`bg-surface font-body ${merriweather.variable} ${notoSerif.variable} ${sourceSans.variable}`}>
        <LanguageProvider>
          <UserProvider initialUserRole={session.role}>
            {/* <StudentCounter/> */}
            {children}

          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

{/* <div className="flex flex-col justify-center text-center">            
            <div className="italic text-gray-700"><p>If you have memorised and sung the below 5  songs, we will honor you by issuing a certificate. Contact us when you are ready. No age limit.</p></div>
            <div className="flex justify-center items-center gap-10">
                <Language/>
                <div>
                    {userRole == UserRole.NO_USER ? <a href="/download">Download Certificate</a> : null}
                </div>
            </div>
        </div> */}
