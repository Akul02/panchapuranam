import React, { Dispatch, SetStateAction } from 'react'

export default function DashboardMenu({activePage, handleMenuClick} : {activePage : number, handleMenuClick:(page: number) => void}) {
    const tabs = ["Quick access", "Students", "Test"];

    return (
        <div className="flex bg-primary">
            {tabs.map((tab, index) => (
                <div key={tab} onClick={() => {handleMenuClick(index)}} 
                    className={`px-5 py-3 text-secondary font-semibold text-sm border-b-2 ${activePage === index ? "border-secondary opacity-100" : "border-transparent opacity-60"}`}>
                    {tab}
                </div>
            ))}
        </div>
    )
}