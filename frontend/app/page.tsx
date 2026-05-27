
import { UserRole } from "../constants/global";
import Footer from "../components/layout/Footer";
import { getUserSession } from "../api/auth";
import HomeClient from "../components/sections/HomeClient";

export default async function Home() {

    const session = await getUserSession();

  return (
    <div className="text-[#333333] w-full">
        <HomeClient/>
        {session.role == UserRole.NO_USER ? <Footer/> : null }

    </div>
  );
}
