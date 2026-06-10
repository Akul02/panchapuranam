
export default function DashboardMenu({className, activePage, handleMenuClick} : {className? : String, activePage : number, handleMenuClick:(page: number) => void}) {
    const tabs = ["Quick access", "Students", "Test"];

    return (
        <div className={`flex bg-primary pt-3 ${className}`}>
            {tabs.map((tab, index) => (
                <div key={tab} onClick={() => {handleMenuClick(index)}} 
                    className={`px-5 py-3 text-accent font-semibold text-sm border-b-2 ${activePage === index ? "border-accent opacity-100" : "border-transparent opacity-60"}`}>
                    {tab}
                </div>
            ))}
        </div>
    )
}