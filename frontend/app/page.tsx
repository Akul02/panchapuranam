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

        <div className="flex flex-col items-center h-screen">
            <Navbar/> 
            <Hero/>
            <div className="flex-grow flex items-center cursor-pointer" onClick={goToSongs}>
                <IoMusicalNote size={40} color="#6E3326"/>
                <PiArrowFatLinesDownDuotone size={40} color="#6E3326"/>
                <IoMusicalNote size={40} color="#6E3326"/>
            </div>
        </div>

        <div ref={songsRef} className="flex flex-col items-center w-full">
            <div className="text-[#6E3326] italic text-lg mt-8">
                If you have memorised and sung the below 5 songs, we will honor you by issuing a certificate. Contact us when you are ready. No age limit.
            </div>
            <Language/>
            <Songs/>
            {userRole == UserRole.NO_USER ? // Student Zone Footer
            <div className="bg-[#6E3326] text-[#CC9966] w-full h-28 sticky bottom-0 flex justify-center items-center">
                <div className="font-semibold text-2xl">
                    Student Zone
                </div>
                <PiLineVerticalBold size={70} color="#CC9966"/>
                <div>
                    <div className="h-min text-center font-semibold p-2 rounded-xl cursor-pointer bg-[#CC9966] text-[#6E3326]">
                        <a href="/download">Download Certificate</a>
                    </div>
                    <p>For those that have memorised the above songs</p>
                </div>
            </div>
            :
            null
            }
        </div>
    </div>
  );
}
