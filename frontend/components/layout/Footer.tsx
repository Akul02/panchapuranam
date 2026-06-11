import StudentCounter from "../features/counter/studentCounter";
import Link from "next/link";
import { certificatesCount } from "../../api/client/certificate";
import { VerticalLineIcon } from "../ui/Icons";
import { getApiData } from "../../lib/api/apiData";
import { handleAppErrors } from "../../lib/api/handlerAppErrors";

export default async function Footer() {

    const res = await getApiData(handleAppErrors(certificatesCount()));
    
    return (
        <div className="bg-primary w-full h-20 sticky bottom-0 flex justify-center items-center lg:h-28">
            <div className="font-heading font-bold text-lg text-accent text-center lg:text-2xl 2xl:text-3xl">
                Student Zone
            </div>
            <VerticalLineIcon size={70} className="text-accent" />

            <div className="mr-2 sm:m-0">
                <Link href="/download">
                    <div className="text-center text-sm font-semibold font-heading p-1 rounded-xl cursor-pointer bg-accent text-primary lg:text-base lg:p-2 2xl:text-lg">
                        Download Certificate
                    </div>
                </Link>
                <p className="font-semibold font-heading text-sm text-center text-accent lg:text-base 2xl:text-lg">
                    For those that have memorised the songs
                </p>
            </div>

            <StudentCounter count={+res.count}/>
        </div>
    );
}
