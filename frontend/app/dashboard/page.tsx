"use client"

import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import DashboardCard from '../../components/ui/DashboardCard'
import DashboardMenu from '../../components/ui/DashboardMenu'
import NavButton from "../../components/ui/NavButton"
import StudentDirectory from "../../components/features/student/StudentDirectory"

export default function page() {

    const [activePage, setActivePage] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMenuClick = (pageIndex: number) => {
        setActivePage(pageIndex);

        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: pageIndex * containerRef.current.clientWidth,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        if (containerRef.current) {
            if (containerRef.current.scrollLeft == 0) {
                setActivePage(0);
            } else {
                const pageIndex = Math.round(containerRef.current.scrollLeft / containerRef.current.clientWidth);
                setActivePage(pageIndex);
            }
        }
    }

    return (
        <div className="flex flex-col h-screen overflow-x-autos">
            <Navbar />

            <DashboardMenu className="lg:hidden" activePage={activePage} handleMenuClick={handleMenuClick}/>

            {/* mobile layout */}
            <div ref={containerRef} onScroll={handleScroll} className="lg:hidden w-screen h-screen overflow-x-auto no-scrollbar snap-x snap-mandatory">
                {/* horizontal scroll container */}
                <div className="flex w-max">
                    {/* nested vertical scroll container */}
                    <div className="w-screen h-max shrink-0 snap-start flex flex-col justify-center">
                        {/* Quick Access  */}
                        <DashboardCard className="min-h-[450px] mx-10 mt-10">
                            <div className="flex flex-col mx-8">
                                <div className="font-bold text-2xl text-primary text-center mt-4 mb-6">Quick Access</div>
                                <a href="/register/student">
                                    <NavButton className="mb-4">Enrol Student</NavButton>
                                </a>
                                <a href="/register/bulk">
                                    <NavButton className="">Bulk Enrol Student</NavButton>
                                </a>
                            </div>
                        </DashboardCard>
                        <DashboardCard className="min-h-[450px] m-10">
                            Test
                        </DashboardCard>
                    </div>
                    
                    <div className="w-screen shrink-0 snap-start">
                    {/* Students */}
                        <DashboardCard className="min-h-[450px] mx-10 mt-10">
                            <StudentDirectory/>
                        </DashboardCard>
                    </div>

                    <div className="w-screen shrink-0 snap-start">
                        <DashboardCard className="min-h-[450px] mx-10 mt-10">
                            Test
                        </DashboardCard>
                    </div>
                    s
                </div>
            </div>

            {/* grid layout */}
            <div className="hidden flex-1 lg:flex lg:items-center lg:justify-center">
                <div className="lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-3 lg-grid-layout lg:w-4/5 lg:h-3/5 2xl:grid-cols-4 2xl:grid-rows-2 two-xl-grid-layout">
                    {/* quick access */}
                    <DashboardCard style={{ gridArea: "card1"}} className="max-h-[300px]">
                        <div className="flex flex-col justify-end mx-4">
                            <div className="font-bold text-2xl text-primary text-center">Quick Access</div>
                            <a href="/register/student">
                                <NavButton className="mb-4">Enrol Student</NavButton>
                            </a>
                            <a href="/register/bulk">
                                <NavButton className="">Bulk Enrol Student</NavButton>
                            </a>
                        </div>
                    </DashboardCard>

                    <DashboardCard style={{ gridArea: "card2"}}>
                        <StudentDirectory/>
                    </DashboardCard>
                    <DashboardCard style={{ gridArea: "card3"}}>test4</DashboardCard>
                    <DashboardCard style={{ gridArea: "card4"}}>test5</DashboardCard>
                    <DashboardCard style={{ gridArea: "card5"}}>test6</DashboardCard>
                </div>
            </div>

        </div>
    )
}
