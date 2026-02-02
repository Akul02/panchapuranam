"use client"

import { ReactElement, useRef } from "react";
import {Merriweather} from "next/font/google";

import { RxDoubleArrowDown } from "react-icons/rx";
import { FaScroll } from "react-icons/fa";
import { PiLineVerticalBold } from "react-icons/pi";
import { PiArrowFatLinesDownDuotone } from "react-icons/pi";
import { IoMusicalNote } from "react-icons/io5";




import Songs from "../components/features/songs/Songs";
import Navbar from "../components/layout/Navbar";
import Language from "../components/features/songs/Language";
import { UserRole } from "../constants/global";
import useUser from "../hooks/useUser";
import Hero from "../components/sections/Hero";
import Footer from "../components/layout/Footer";


const merriweather = Merriweather({
    subsets:["latin"],
    weight:["900"],
})

export default function Home() {
    const [userRole] = useUser();

    const songsRef = useRef<HTMLDivElement | null>(null);

    const goToSongs = () => {
        songsRef.current?.scrollIntoView({behavior: "smooth"})
    }

  return (
    <div className="text-[#333333] w-full">
        {/* home page component */}
        <div className="flex flex-col items-center justify-between h-screen">
            <Navbar/> 
            <Hero/>
            <div className="flex items-center cursor-pointer" onClick={goToSongs}>
                <IoMusicalNote size={40} color="#6E3326"/>
                <PiArrowFatLinesDownDuotone size={40} color="#6E3326"/>
                <IoMusicalNote size={40} color="#6E3326"/>
            </div>
            {/* sticky footer placeholder */}
            <div className="invisible h-28"></div>
        </div>

        {/* songs component */}
        <div ref={songsRef} className="flex flex-col items-center w-full">
            <div className="text-[#6E3326] italic text-lg mt-8">
                If you have memorised and sung the below 5 songs, we will honor you by issuing a certificate. Contact us when you are ready. No age limit.
            </div>
            <Language/>
            <Songs/>
        </div>
        
        {/* footer component */}
        {userRole == UserRole.NO_USER ? <Footer/> : null }
    </div>
  );
}
