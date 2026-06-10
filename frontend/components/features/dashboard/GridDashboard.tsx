import React from 'react'
import DashboardCard from "../../ui/cards/DashboardCard"
import Link from "next/link"
import NavButton from "../../ui/buttons/NavButton"
import StudentDirectory from "../student/StudentDirectory"

export default function GridDashboard() {
  return (
    <div className="hidden flex-1 lg:flex lg:items-center lg:justify-center">
        <div className="lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-3 lg-grid-layout lg:w-4/5 lg:h-3/5 2xl:grid-cols-4 2xl:grid-rows-2 two-xl-grid-layout">
            {/* quick access */}
            <DashboardCard style={{ gridArea: "card1"}} className="max-h-[300px] overflow-y-auto">
                <div className="flex-1 w-full flex flex-col justify-start gap-4 px-4">
                    <div className="font-bold font-heading text-2xl text-primary text-center mt-4">Quick Access</div>
                    <Link href="/register/student">
                        <NavButton className="">Enrol Student</NavButton>
                    </Link>
                    <Link href="/register/bulk">
                        <NavButton className="">Bulk Enrol Student</NavButton>
                    </Link>
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
  )
}
