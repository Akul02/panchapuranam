import RegisterStudent from "../../../components/features/teacher/RegisterStudent";
import Navbar from "../../../components/layout/Navbar";

export default function register() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar showDashButton={true} />
            <RegisterStudent />
        </div>
    );
}
