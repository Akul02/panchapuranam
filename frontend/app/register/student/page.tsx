import RegisterStudent from '../../../components/features/teacher/RegisterStudent'
import Navbar from "../../../components/layout/Navbar"

export default function register () {
  return (
    <div>
        <Navbar showDashButton = {true} />
        <RegisterStudent/>
    </div>
  )   
}

