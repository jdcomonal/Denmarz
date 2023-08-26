import logo from '../img/logo_denmarz1.png'
import { FaMapMarkerAlt, FaMobileAlt, FaEnvelope, FaFacebookSquare, FaClock } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    return(
      <footer className="footer">
        <div className='footer__Flex-row'>
          <div className="footer__div-logo">
            <div className='footer__logo'>
              <img src={logo} alt="Denmarz logo" />
            </div>
            
            <div className='footer__subscribe'>
            <p><strong>Never Miss a Slice of the Action!</strong></p>
              <form onSubmit={()=>{}} className='footer__form'>
                 <input
                  type="email"
                  id="email"
                 placeholder='Email'
                  required
                  className='footer__input'
                />

                <button type="submit" className='footer__button'>Subscribe</button>
              </form>
            </div>
          </div>
          <div className='footer__contact'>
              
                <h2>Contact Us</h2>
                <p><FaMapMarkerAlt/> Str. Rizal, Madang, City of Mati, Davao Or.</p>
                <p><FaMobileAlt/> 0998 761 XXXX</p>
                <p><FaEnvelope/> XXXXXXXXXXXX@gmail.com</p>
                <p><a href='https://web.facebook.com/denmarzpizzahouse' rel="noreferrer" target="_blank">
                  <FaFacebookSquare/> Denmarz Pizza House</a></p>
            
          </div>
          <div className='footer__workingHour'>

            <h2>Working Hour</h2>
            {/* <p><FaMapMarkerAlt/> Rizal extension, Madang, City of Mati,Davao Oriental</p> */}
            <p><FaClock/> Monday - Tuesday | 10:00 am - 08:00 pm</p>
            <p><FaClock/> Wednesday | 09:00 am - 08:00 pm</p>
            <p><FaClock/> Thursday - Saturday | 10:00 am - 08:00 pm</p>
            <p><FaClock/> Sunday | 10:00 am - 08:00 pm</p>

          </div>
        </div>
        <p className='footer_copy'> &copy; 2023 Denmarz Pizza House. All rights reserved. 
        {/* | <a href="https://www.freepik.com/free-vector/sign-concept-illustration_5423351.htm#query=create%20account&position=6&from_view=search&track=ais">Image by storyset</a> on Freepik */}
        </p>
      </footer>
    )
   }
   
   export default Footer;