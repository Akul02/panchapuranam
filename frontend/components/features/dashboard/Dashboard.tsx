"use client"

import { useRef, useState } from "react";
import DashboardMenu from "./DashboardMenu"
import MobileDashboard from "./MobileDashboard";
import GridDashboard from "./GridDashboard";

export default function Dashboard() {
    
    const [activePage, setActivePage] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

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
    <div className="flex-1 flex flex-col ">
        <DashboardMenu className="lg:hidden" activePage={activePage} handleMenuClick={handleMenuClick}/>
        <MobileDashboard handleScroll={handleScroll} containerRef={containerRef}/>
        <GridDashboard/>
    </div>
  )
}
