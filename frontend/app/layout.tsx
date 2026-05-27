import type { Metadata } from "next";
import "../styles/globals.css";

//  components
import LanguageProvider from "../context/LanguageContext";
import Navbar from "../components/layout/Navbar";
import UserProvider from "../context/UserContext";
import StudentCounter from "../components/features/counter/studentCounter";
import { getUserSessionServer } from "../api/server/authServer";

export const metadata: Metadata = {
  title: "Panchapuranam Home",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getUserSessionServer();
  console.log(session);

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F4F4E8]">
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
