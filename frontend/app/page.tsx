import { UserRole } from "../constants/global";
import Footer from "../components/layout/Footer";
import { getUserSession } from "../api/auth";
import HomeClient from "../components/sections/HomeClient";
import { getSongs } from "../api/songs";

export default async function Home( {searchParams} : {searchParams: {language? : string}}) {

    const session = await getUserSession();

    const language = searchParams.language ?? "Tamil";

    const songs = await getSongs(language);

  return (
    <div className="text-[#333333] w-full">
        <HomeClient songs={songs}/>
        {session.role == UserRole.NO_USER ? <Footer/> : null }

    </div>
  );
}
