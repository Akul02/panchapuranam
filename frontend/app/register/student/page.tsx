import { getPrograms } from "../../../api/server/programServer";
import RegisterStudent from "../../../components/features/teacher/RegisterStudent";
import Navbar from "../../../components/layout/Navbar";
import { UserRole } from "../../../constants/global";
import { getApiData } from "../../../lib/api/apiData";
import { handleAppErrors } from "../../../lib/api/handlerAppErrors";
import { requireRole } from "../../../lib/auth/requireRole";

export default async function register() {

    await requireRole(UserRole.TEACHER);
    const availablePrograms = await getApiData(handleAppErrors(getPrograms()));

    return (
        <div className="h-screen flex flex-col">
            <Navbar showDashButton={true} />
            <RegisterStudent availablePrograms={availablePrograms}/>
        </div>
    );
}
