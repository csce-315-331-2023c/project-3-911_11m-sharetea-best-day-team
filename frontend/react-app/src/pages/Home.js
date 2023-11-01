import AccessibilityButton from "../components/AccessibilityButton"
import TopNavbar from "../components/TopNavbar"
import Banner from "../images/sharetea_banner.jpg"

export function Home() {
    return (
        <div className="home">
        <TopNavbar/>

        <div className="banner-container"> 
            <img src={Banner} className="banner"></img>
        </div>
        
        <div className="welcoming-text-container">
            <p className="welcoming-text">Welcome to Sharetea’s website<br></br>
            View our menu or order online here!</p>
        </div>

        <hr className="red-horizontal-rule"></hr>

        <footer>
        <div className="footer-container">
            <div className="footer-text-container">
                <p className="footer-text">
                Team 11M
                </p>
            </div>
        </div>
        </footer>
        
        <AccessibilityButton/>
        </div>
    )
}