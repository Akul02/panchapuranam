import RegisterTeacher from "../../../components/features/admin/RegisterTeacher";
import Navbar from "../../../components/layout/Navbar";
import { UserRole } from "../../../constants/global";
import { requireRole } from "../../../lib/auth/requireRole";

export default async function register() {

    await requireRole(UserRole.ADMIN);

    return (
        <div className="h-screen flex flex-col">
            <Navbar showDashButton={true} />
            <RegisterTeacher />
        </div>
    );
}
