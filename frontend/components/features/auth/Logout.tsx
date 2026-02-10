import { useRouter } from "next/navigation";
import { UserRole } from "../../../constants/global";
import useUser from "../../../hooks/useUser";
import NavButton from "../../ui/NavButton";

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
        <div onClick={handleLogout}>
            <NavButton>Logout</NavButton>
        </div>
    )
}