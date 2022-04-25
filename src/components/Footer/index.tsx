import {BsGoogle, BsTwitter, BsInstagram, BsYoutube} from 'react-icons/bs'
import './index.css'

const Footer = () => (
    <div className='footer-container'>
        <div className='footer-icons-container'>
            <div>
                <BsGoogle className='footer-icon'/>
            </div>
            <div>
                <BsTwitter className='footer-icon'/>
            </div>
            <div>
                <BsInstagram className='footer-icon'/>
            </div>
            <div>
                <BsYoutube className='footer-icon'/>
            </div>
        </div>
        <p className='footer-contact-text'>Contact Us</p>
    </div>
)

export default Footer