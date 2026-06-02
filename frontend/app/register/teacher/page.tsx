import RegisterTeacher from "../../../components/features/admin/RegisterTeacher";
import Navbar from "../../../components/layout/Navbar";

export default function register() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar showDashButton={true} />
            <RegisterTeacher />
        </div>
    );
}
