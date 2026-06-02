import { useRouter } from "next/navigation";
import { UserRole } from "../../../constants/global";
import useUser from "../../../hooks/useUser";
import NavButton from "../../ui/buttons/NavButton";
import { logout } from "../../../api/client/auth";

export default function Logout () {

    const [userRole, setUserRole] = useUser();

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            setUserRole(UserRole.NO_USER);
            router.push("/");
        } catch (err) {
            console.log(err instanceof Error ? err.message : "Something went wrong");
        }
    }

    return (
        <div onClick={handleLogout}>
            <NavButton>Logout</NavButton>
        </div>
    )
}