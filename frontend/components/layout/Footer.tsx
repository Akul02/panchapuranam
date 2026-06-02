import { PiLineVerticalBold } from "react-icons/pi";
import StudentCounter from "../features/counter/studentCounter";
import Link from "next/link";
import { certificatesCount } from "../../api/client/certificate";

export default async function Footer() {

    const res = await certificatesCount();
    
    return (
        <div className="bg-primary w-full h-20 sticky bottom-0 flex justify-center items-center lg:h-28">
            <div className="font-semibold text-lg text-accent text-center lg:text-2xl">
                Student Zone
            </div>
            <PiLineVerticalBold size={70} className="text-accent" />

            <div className="mr-2 sm:m-0">
                <Link href="/download">
                    <div className="text-center text-sm font-semibold p-1 rounded-xl cursor-pointer bg-accent text-primary lg:text-base lg:p-2">
                        Download Certificate
                    </div>
                </Link>
                <p className="font-semibold text-sm text-center text-accent lg:text-base">
                    For those that have memorised the songs
                </p>
            </div>

            <StudentCounter count={+res.count}/>
        </div>
    );
}
