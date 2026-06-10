import React, { RefObject } from 'react'
import DashboardCard from "../../ui/cards/DashboardCard"
import Link from "next/link"
import NavButton from "../../ui/buttons/NavButton"
import StudentDirectory from "../student/StudentDirectory"

export default function MobileDashboard({handleScroll, containerRef} : {handleScroll: () => void, containerRef: RefObject<HTMLDivElement | null>}) {
  return (
    <div ref={containerRef} onScroll={handleScroll} className="lg:hidden h-screen overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {/* horizontal scroll container */}
        <div className="flex w-max">
            {/* nested vertical scroll container */}
            <div className="w-screen h-max shrink-0 snap-start flex flex-col justify-center">
                {/* Quick Access  */}
                <DashboardCard className="min-h-[450px] mx-10 mt-10">
                    <div className="flex flex-col mx-8">
                        <div className="font-bold font-heading text-2xl text-primary text-center mt-4 mb-6">Quick Access</div>
                        <Link href="/register/student">
                            <NavButton className="mb-4">Enrol Student</NavButton>
                        </Link>
                        <Link href="/register/bulk">
                            <NavButton className="">Bulk Enrol Student</NavButton>
                        </Link>
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
        </div>
    </div>
  )
}
