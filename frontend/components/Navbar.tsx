import Link from "next/link";
import Language from "./Language";

export default function Navbar () {
    return (
        <nav> 
            <img className="profile_pic" src="/logo_final.PNG"/>
            <Language/>
            <h1>Teachers Login</h1>
            <Link href="/events">Events</Link>
        </nav>
    );
}