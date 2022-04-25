import { BsStarFill } from "react-icons/bs"
import { Link, withRouter, RouteComponentProps } from "react-router-dom"
import "./index.css"

interface BookShelfEachBookInterface{
    eachBook: {authorName: string,
                coverPic: string,
                id: string,
                rating: number,
                readStatus: string,
                title: string}
}

const BookShelfEachBook = (props: BookShelfEachBookInterface) => {
    const {eachBook} = props
    const {authorName, coverPic, id, rating, readStatus, title} = eachBook
    return(                                                                                                                                                                                         
    <Link to={`/books/${id}`} className="book-shelf-each-book-link">
        <li className="book-shelf-li-ele">
            <div>
                <img src={coverPic} className="book-shelf-cover-pic" alt="book shelf cover pic"/>
            </div>                                                                                                                                      
            <div className="book-self-book-details-container">
                <h1 className='book-shelf-book-title'>{title}</h1>
                <p className='book-shelf-author-name'>{authorName}</p>
                <div className='book-shelf-rating-container'>
                    <p className='book-shelf-rating-title'>Avg Rating</p>
                    <BsStarFill className='book-shelf-start-icon'/>
                    <p className='book-shelf-rating'>{rating}</p>
                </div>
                <p className='book-shelf-status'>Status : <span className='book-shelf-book-status'>{readStatus}</span></p>
            </div>
        </li>
    </Link>
)
}

export default BookShelfEachBook