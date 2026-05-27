import { UserRole } from "../constants/global";
import Footer from "../components/layout/Footer";
import HomeClient from "../components/sections/HomeClient";
import { getSongs } from "../api/client/songs";
import { getUserSessionServer } from "../api/server/authServer";

export default async function Home({
  searchParams,
}: {
  searchParams: { language?: string };
}) {
  const session = await getUserSessionServer();
  console.log(session);
  const language = (await searchParams.language) ?? "Tamil";
  const songs = await getSongs(language);

  return (
    <div className="text-[#333333] w-full">
      <HomeClient songs={songs} />
      {session.role == UserRole.NO_USER ? <Footer /> : null}
    </div>
  );
}
