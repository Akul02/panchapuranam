
import Navbar from '../../components/layout/Navbar'
import { requireRole } from "../../lib/auth/requireRole"
import Dashboard from "../../components/features/dashboard/Dashboard"
import { UserRole } from "../../constants/global"

export default async function page() {

    await requireRole(UserRole.TEACHER);

    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <Dashboard/>
        </div>
    )
}
