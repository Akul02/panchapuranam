import StudentProfile from "../../../components/features/student/profile/StudentProfile";
import Navbar from "../../../components/layout/Navbar";
import { UserRole } from "../../../constants/global";
import { requireRole } from "../../../lib/auth/requireRole";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {

    await requireRole(UserRole.TEACHER);
    
    const {id} = await params;

    return (
        <div>
            <Navbar showDashButton={true} />
            <StudentProfile studentId={id}/>
        </div>
    )
}
