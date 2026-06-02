import { StudentIcon } from "../../ui/Icons";

export default function StudentCounter({count}: {count: number}) {

    return (
        <div className={`bg-primary sm:relative sm:left-2 md:left-14 lg:left-28 xl:left-auto xl:top-6 xl:absolute xl:right-24 ${count == 0 ? "hidden" : ""}`}>
            <div className="font-bold text-2xl flex gap-x-5 text-accent lg:text-4xl">
                {count}
                <StudentIcon className="text-accent" size={38}/>
            </div>
            <p className="font-bold text-sm text-accent lg:text-base">Students Enlightened</p>
        </div>
    )
}
