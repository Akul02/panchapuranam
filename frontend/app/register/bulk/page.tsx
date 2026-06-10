import BulkEnrolStudents from "../../../components/features/teacher/BulkEnrolStudents";
import Navbar from "../../../components/layout/Navbar";
import { UserRole } from "../../../constants/global";
import { requireRole } from "../../../lib/auth/requireRole";

export default async function bulk() {

    await requireRole(UserRole.TEACHER);

    return (
        <div className="flex flex-col h-screen">
            <Navbar showDashButton={true} />
            <BulkEnrolStudents />
        </div>
    );
}
