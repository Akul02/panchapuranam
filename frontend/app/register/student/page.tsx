import { getPrograms } from "../../../api/server/programServer";
import RegisterStudent from "../../../components/features/teacher/RegisterStudent";
import Navbar from "../../../components/layout/Navbar";
import { UserRole } from "../../../constants/global";
import { requireRole } from "../../../lib/auth/requireRole";

export default async function register() {

    await requireRole(UserRole.TEACHER);
    const availablePrograms = await getPrograms();

    return (
        <div className="h-screen flex flex-col">
            <Navbar showDashButton={true} />
            <RegisterStudent availablePrograms={availablePrograms}/>
        </div>
    );
}
