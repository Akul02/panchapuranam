import RegisterTeacher from '../../../components/features/admin/RegisterTeacher'
import Navbar from "../../../components/layout/Navbar"

export default function register () {
  return (
    <div>
        <Navbar showDashButton = {true} />
        <RegisterTeacher/>
    </div>
  )   
}