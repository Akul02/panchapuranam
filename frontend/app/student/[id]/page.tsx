import Navbar from "../../../components/layout/Navbar";
import StudentProfile from "../../../components/features/student/StudentProfile";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {

    const {id} = await params;

    return (
        <div>
            <Navbar showDashButton={true} />
            <StudentProfile studentId={id}/>
        </div>
    )
}
