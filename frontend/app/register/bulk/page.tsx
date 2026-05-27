import BulkEnrolStudents from '../../../components/features/teacher/BulkEnrolStudents';
import Navbar from "../../../components/layout/Navbar";

export default function bulk () {
    return (
        <div>
            <Navbar showDashButton={true} />
            <BulkEnrolStudents/>
        </div>
    )
}
