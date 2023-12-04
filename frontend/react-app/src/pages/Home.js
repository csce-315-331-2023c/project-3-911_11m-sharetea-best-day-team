import AccessibilityButton from "../components/AccessibilityButton"
import TopNavbar from "../components/TopNavbar"
import Banner from "../images/sharetea_banner.jpg"
import StoryPicture from "../images/ourstory.png"
import Footer from '../components/Footer';
import '../styles/home.css'


export function Home() {
    return (
        <div className="home">
        <TopNavbar/>

        <div className="banner-container"> 
            <img src={Banner} className="banner" alt="Sharetea Banner"/>
        </div>
        
        <div className="welcoming-text-container">
            <p className="welcoming-text-black">Welcome to Sharetea’s website</p>

        </div>

        <hr className="red-horizontal-rule"></hr>

        <div className="section-break"></div>

        <h2 className="section-header">SHARETEA BUBBLE TEA</h2>

        <p className="section-content">Sharetea is a premium bubble tea brand company with over 30 years of experience in the tea and beverage industry.  We have locations across the globe and continue to grow sharing our high quality and tasty bubble tea with the world. <br></br><br></br>

        Wondering what bubble tea drink is? Sharetea bubble tea menu offers a variety of bubble tea and topping selections for all the tea lovers. The ingredients are shipped from Taiwan, where bubble tea was originated, to ensure the products have consistent quality. We provide catering service for those who are looking to impress their guests with delicious drinks. <br></br><br></br>

        Sharetea offers great franchise opportunity for owning and operating a successful bubble tea business. We provide necessary assistance to help guide you along the process including training and operation guidance. </p> 

        <div className="section-break"></div>
        
        <h2 className="section-header">OUR STORY</h2>

        <div className="our-story-container">
        <div className="our-story-text">
          <p>
            Mr. Cheng Kai-Lung, the founder of Sharetea, was working in the film
            and TV industry as a director in 1992. Although being a director
            seems like one of the most glamorous jobs in the world, he was not
            satisfied yet. He quit his job and started his own tea street vendor
            business. At first, he encountered many hardships, but instead of
            giving up, he deeply believed “when you have strong faith, big
            thing happens”. <br></br>
            <br></br>
            After all the hard work he put in, Sharetea was adored by the
            crowd, and that was how the first Sharetea store got started.
          </p>
        </div>

        <div className="pic-container">
          <img src={StoryPicture} alt="Sharetea Story" />
        </div>
      </div>

      <div className="section-break"></div>
        <Footer/>
        <AccessibilityButton/>
      </div>
    )
}