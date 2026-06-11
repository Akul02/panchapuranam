import { redirect } from "next/navigation";
import { getUserSessionServer } from "../../api/server/authServer";
import { UserRole } from "../../constants/global";

export async function requireRole(role: UserRole) {
    const apiResult = await getUserSessionServer();
    
    if (apiResult.success == true ) {
        const session = apiResult.data;
        if (session.role == UserRole.NO_USER) {
            redirect("/login");
        }

        if (session.role !== role) {
            redirect("/");
        }

        return session;
    }
    
}
