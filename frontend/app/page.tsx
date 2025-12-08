"use client"

import { ReactElement, useRef } from "react";
import {Merriweather} from "next/font/google";

import { RxDoubleArrowDown } from "react-icons/rx";
import { FaScroll } from "react-icons/fa";

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
    <div className="text-[#333333] w-screen">

        <div className="flex flex-col items-center h-screen">
            <Navbar/> 
            <Hero/>
            <div className="flex mt-12 cursor-pointer" onClick={goToSongs}>
                <FaScroll size={40} color="#6E3326"/>
                <RxDoubleArrowDown size={40} color="#6E3326"/>
            </div>
        </div>

        <div ref={songsRef} className="flex flex-col items-center">
            {/* {userRole == UserRole.NO_USER ? <a href="/download">Download Certificate</a> : null} */}
            <Language/>
            <Songs/>
        </div>
    </div>
  );
}
