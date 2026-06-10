import { redirect } from "next/navigation";
import { getUserSessionServer } from "../../api/server/authServer";
import { UserRole } from "../../constants/global";

export async function requireRole(role: UserRole) {
    const session = await getUserSessionServer();

    if (!session) {
        redirect("/login");
    }

    if (session.role !== role) {
        redirect("/");
    }

    return session;
}
