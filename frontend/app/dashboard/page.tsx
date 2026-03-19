"use client"

import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import DashboardCard from '../../components/ui/DashboardCard'
import DashboardMenu from '../../components/ui/DashboardMenu'

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

    // const handleScroll = () => {
    //     if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    //     scrollTimeout.current = setTimeout(() => {
    //         if (containerRef.current) {
    //             if (containerRef.current.scrollLeft == 0) {
    //                 setActivePage(0);
    //             } else {
    //                 const pageIndex = containerRef.current.scrollLeft / containerRef.current.clientWidth;
    //                 setActivePage(pageIndex);
    //             }
    //         }
    //     }, 150);
    // }

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
        <div>
            <Navbar />

            <DashboardMenu activePage={activePage} handleMenuClick={handleMenuClick}/>

            <div ref={containerRef} onScroll={handleScroll} className="w-screen overflow-x-auto no-scrollbar snap-x snap-mandatory">
                <div className="flex w-max">
                    <DashboardCard>Quick Actions</DashboardCard>
                    <DashboardCard>Students</DashboardCard>
                    <DashboardCard>Test</DashboardCard>
                </div>
            </div>


        </div>
    )
}
