import { languages, UserRole } from "../constants/global";
import Footer from "../components/layout/Footer";
import HomeClient from "../components/sections/HomeClient";
import { getSongs } from "../api/client/songs";
import { getUserSessionServer } from "../api/server/authServer";
import { redirect } from "next/navigation";
import { getApiData } from "../lib/api/apiData";
import { handleAppErrors } from "../lib/api/handlerAppErrors";

export default async function Home({
    searchParams,
}: {
    searchParams: { language?: string };
}) {

    const session = await getApiData(getUserSessionServer());

    const language = (await searchParams).language ?? "";

    const isSupportedLanguage = (language : string) => {
      return languages.includes(language);
    }

    if (!isSupportedLanguage(language)) {
      redirect("/?language=Tamil");
    }

    const songs = await getApiData(handleAppErrors(getSongs(language)));

    return (
        <div className="text-[#333333] w-full">
            <HomeClient songs={songs} />
            {session.role == UserRole.NO_USER ? <Footer /> : null}
        </div>
    );
}
