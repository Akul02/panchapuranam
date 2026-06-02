import { getPrograms } from "../../../api/server/programServer";
import RegisterStudent from "../../../components/features/teacher/RegisterStudent";
import Navbar from "../../../components/layout/Navbar";

export default async function register() {

    const availablePrograms = await getPrograms();

    return (
        <div className="h-screen flex flex-col">
            <Navbar showDashButton={true} />
            <RegisterStudent availablePrograms={availablePrograms}/>
        </div>
    );
}
