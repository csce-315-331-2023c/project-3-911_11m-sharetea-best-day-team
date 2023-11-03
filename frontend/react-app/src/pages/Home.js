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

        <p>Lorem ipsum dolor sit amet. Eos velit velit et voluptate error aut itaque laboriosam qui corporis magni eum porro nihil. Et temporibus voluptatem qui perspiciatis sint aut nesciunt deleniti in recusandae voluptatem ut inventore nemo aut corporis quia?

Hic minima corporis sed perspiciatis expedita 33 eaque omnis et voluptatem voluptatibus. Eum pariatur necessitatibus aut temporibus error eos officiis totam ut laborum quidem. Et accusamus voluptas aut provident aliquam et voluptatibus incidunt sed necessitatibus quia qui odio corrupti. Cum doloribus error a quia ipsam est aspernatur consequatur.

Qui saepe voluptatibus et natus harum qui exercitationem ipsum ut recusandae minima ut debitis Quis? Ut mollitia nisi est quasi molestias ea dolor quia ut dignissimos quas id exercitationem magni et reiciendis consequatur qui voluptatem dolor. Hic perspiciatis iste vel facilis quia id optio quod. Sed laboriosam eius in cupiditate possimus quo pariatur doloribus et sunt repellendus sit repudiandae totam.
</p>

        {/* <footer> */}
        <div className="footer-container">
            <div className="footer-text-container">
                <p className="footer-text">
                Team 11M
                </p>
            </div>
        </div>
        {/* </footer> */}
        
        <AccessibilityButton/>
        </div>
    )
}