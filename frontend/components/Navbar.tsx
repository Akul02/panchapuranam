import Contact from "./ContactInfo";
import Language from "./Language";

export default function Navbar () {

    return (
        <nav className="navbar_background"> 
            <img className="profile_pic" src="/logo_final.PNG"/>
            <Language/>
            <a href="/events">Events</a>
            <h1>Download Certificate</h1>
            <a href="/login">Login</a>
            <Contact/>
        </nav>
    );
}