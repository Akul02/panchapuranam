"use client";

import React, { useRef } from "react";
import Navbar from "../layout/Navbar";
import Hero from "./Hero";
import { IoMusicalNote } from "react-icons/io5";
import { PiArrowFatLinesDownDuotone } from "react-icons/pi";
import Language from "../features/songs/Language";
import Songs from "../features/songs/Songs";

export default function HomeClient() {
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
                        <IoMusicalNote size={40} color="#6E3227" />
                        <PiArrowFatLinesDownDuotone size={40} color="#6E3227" />
                        <IoMusicalNote size={40} color="#6E3227" />
                    </div>
                </div>
                {/* sticky footer placeholder h-28 is the height of the footer*/}
                <div className="invisible h-28"></div>
            </div>

            {/* songs component */}
            <div ref={songsRef} className="flex flex-col items-center w-full">
                <div className="text-[#6E3326] italic text-center text-base mt-4 mx-2 md:mt-8 md:mx-4 md:text-lg">
                    If you have memorised and sung the below 5 songs, we will honor you by
                    issuing a certificate. Contact us when you are ready. No age limit.
                </div>
                <Language />
                <Songs />
            </div>
        </div>
    );
}
