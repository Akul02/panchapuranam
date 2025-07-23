import Navbar from "../components/Navbar";
import Songs from "../components/Songs";

export default function Home() {
  return (
    <div className="home text_colour">
        <Navbar/>

        <div className="header_outer">
            <img className="profile_pic_nav" src="/logo_final.PNG"/>
            <div className="header_inner">
                <div className="title">
                    <h1>பஞ்சபுராணம் ~ PANCHAPURANAM</h1>
                </div>
                <div className="instructions"><p>If you have memorised and sung the below 5  songs, we will honor you by issuing a certificate. Contact us when you are ready. No age limit.</p></div>
            </div>
        </div>
        
        <Songs/>
    </div>
  );
}
