import StudentProfile from "../../../components/features/student/profile/StudentProfile";
import Navbar from "../../../components/layout/Navbar";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {

    const {id} = await params;

    return (
        <div>
            <Navbar showDashButton={true} />
            <StudentProfile studentId={id}/>
        </div>
    )
}
