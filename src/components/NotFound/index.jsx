import { Link } from "react-router-dom"
import './index.css'

const NotFound = () => (
    <div>
        <div className="not-fount-container">
            <img src="https://res.cloudinary.com/degjdup40/image/upload/v1650907972/Group_7484_burzb2.png" className="not-found-image" alt="not found pic"/>
            <h1 className="page-not-found-title">Page Not Found</h1>
            <p className="not-found-description">we are sorry, the page you requested could not be found, Please go back to the homepage.</p>
            <Link to="/" className="not-found-link-go-back">
                <button className="go-back-button">Go Back to Home</button>
            </Link>
        </div>
    </div>
)

export default NotFound