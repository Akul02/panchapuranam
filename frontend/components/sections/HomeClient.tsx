"use client";

import { useRef } from "react";
import Navbar from "../layout/Navbar";
import Hero from "./Hero";
import Language from "../features/songs/Language";
import Songs from "../features/songs/Songs";
import { Song } from "../../types/song";
import { MusicNoteIcon, ArrowDownIcon } from "../ui/Icons";

export default function HomeClient({songs} : {songs: Song[]}) {
    const songsRef = useRef<HTMLDivElement | null>(null);

    const goToSongs = () => {
        songsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            {/* home page component */}
            <div className="flex flex-col items-center justify-between h-screen">
                <Navbar showDashButton={true} />
                <Hero />
                <div className="cursor-pointer" onClick={goToSongs}>
                    <p className="italic text-primary text-center font-semibold">
                        Begin Listening
                    </p>
                    <div className="flex items-center animate-pulse">
                        <MusicNoteIcon size={40} className="text-primary" />
                        <ArrowDownIcon size={40} className="text-primary" />
                        <MusicNoteIcon size={40} className="text-primary" />
                    </div>
                </div>
                {/* sticky footer placeholder h-28 is the height of the footer*/}
                <div className="invisible h-28"></div>
            </div>

            {/* songs component */}
            <div ref={songsRef} className="flex flex-col items-center w-full">
                <div className="text-primary italic text-center text-base mt-4 mx-2 md:mt-8 md:mx-4 md:text-lg">
                    If you have memorised and sung the below 5 songs, we will honor you by
                    issuing a certificate. Contact us when you are ready. No age limit.
                </div>
                <Language />
                <Songs songs={songs} />
            </div>
        </div>
    );
}
