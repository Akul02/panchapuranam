import Songs from "../components/Songs";

export default function Home() {
  return (
    <div className="home">
        <div className="title"><h1>Panchapuranam</h1></div>
        <div className="instructions"><p>If you have memorised and sung the below 5  songs, we will honor you by issuing a certificate. Contact us when you are ready. No age limit.</p></div>
        <Songs/>
        <div className="footer">Download Certificate</div>
    </div>
  );
}
