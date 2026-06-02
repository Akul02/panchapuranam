import Download from '../../components/features/certificate/download'
import Navbar from "../../components/layout/Navbar"

export default function page() {
  return (
    <div className="h-screen flex flex-col">
        <Navbar/>
        <Download/>
    </div>
  )
}
