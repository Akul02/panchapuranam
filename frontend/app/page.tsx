import Navbar from "../components/Navbar";
import Songs from "../components/Songs";

export default function Home() {
  return (
    <div className="home text_colour">
        <div className="header header_background">
            <div className="title">
                <h1>பஞ்சபுராணம் ~ PANCHAPURANAM</h1>
            </div>
            <div className="instructions"><p>If you have memorised and sung the below 5  songs, we will honor you by issuing a certificate. Contact us when you are ready. No age limit.</p></div>
            <Navbar/>
        </div>
        <Songs/>
    </div>
  );
}
