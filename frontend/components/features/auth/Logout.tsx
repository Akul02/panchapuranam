import { useRouter } from "next/navigation";
import { UserRole } from "../../../constants/global";
import useUser from "../../../hooks/useUser";

export default function Logout () {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [userRole, setUserRole] = useUser();

    const router = useRouter();

    const handleLogout = () => {
        fetch(`${apiUrl}/logout`, {
            method: 'POST',
            credentials: "include"
        })
        .then(async (res) => {
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg);
            }
            setUserRole(UserRole.NO_USER);
            router.push("/");
        })
    }

    return (
        <div className="font-semibold border-2 p-2 rounded-xl border-[#CC9966] cursor-pointer hover:bg-[#CC9966] hover:text-[#6E3326]" onClick={handleLogout}>
            Logout
        </div>
    )
}