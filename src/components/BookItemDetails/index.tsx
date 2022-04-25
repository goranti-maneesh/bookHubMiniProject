import {Component} from 'react'
import Cookies from 'js-cookie'
import FailureView from '../FailureView'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import { RouteComponentProps } from "react-router-dom"
import { BsStarFill } from 'react-icons/bs'
import Footer from '../Footer'

import './index.css'

interface BookDetailsHistoryInterface{
    match: any
    history: RouteComponentProps
}

interface ApiConstantsInterface{
    initial: string,
    loading: string,
    success: string,
    failure: string
}

interface BookDetailsInterface{
    apiStatus: string,
    bookDetails: bookDetailsStateInterface
}

interface bookDetailsStateInterface{
    aboutAuthor: string,
    aboutBook: string,
    authorName: string,
    coverPic: string,
    id: string,
    rating: number,
    readStatus: string,
    title: string
}

const apiConstants: ApiConstantsInterface = {
    initial: "INITIAL",
    loading: "LOADING",
    success: "SUCCESS",
    failure: "FAILURE"
}

class BookItemDetails extends Component <BookDetailsHistoryInterface>{
    state: BookDetailsInterface = {
        apiStatus: apiConstants.initial,
        bookDetails: {
            aboutAuthor: "",
            aboutBook: "",
            authorName: "",
            coverPic: "",
            id: "",
            rating: 0,
            readStatus: "",
            title: ""
        }
    }

    componentDidMount(){
        this.getBookDetails()
    }

    getBookDetails = async () => {
        this.setState({
            apiStatus: apiConstants.loading
        })

        const jwtToken = Cookies.get("jwt_token")

        const {match} = this.props
        const {params} = match
        const {id} = params
        
        const url = `https://apis.ccbp.in/book-hub/books/${id}`
        const options = {
            method:'GET',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        }

        const response = await fetch(url, options)
        
        if(response.ok){
            const jsonData = await response.json()
            const data = jsonData.book_details
            const updatedData = {
                aboutAuthor: data.about_author,
                aboutBook: data.about_book,
                authorName: data.author_name,
                coverPic: data.cover_pic,
                id: data.id,
                rating: data.rating,
                readStatus: data.read_status,
                title: data.title
            }

            this.setState({
                apiStatus: apiConstants.success,
                bookDetails: updatedData
            })
        }
        else{
            this.setState({
                apiStatus: apiConstants.failure
            })
        }
    }

    renderFailureView = () => <div className='book-details-failure-view-container'>
        <FailureView tryAgain={this.getBookDetails}/>
    </div>

    renderLoader = () => (
        <div className="products-loader-container">
            <Loader type={'TailSpin'} color="#0284C7" height={50} width={50}/>
        </div>
    )

    renderBookDetails = () => {
        const {bookDetails} = this.state
        return(
                <div className='book-details-sub-container'>
                    <div className='book-details-top-section'>
                        <div>
                            <img src={bookDetails.coverPic} alt="cover pic" className='book-details-cover-pic'/>
                        </div>
                        <div className='book-details-text-container'>
                            <h1 className='book-details-title'>{bookDetails.title}</h1>
                            <p className='book-details-author-name'>{bookDetails.authorName}</p>
                            <div className='book-details-rating-container'>
                                <p className='rating-title'>Avg Rating</p>
                                <BsStarFill className='start-icon'/>
                                <p className='rating'>{bookDetails.rating}</p>
                            </div>
                            <p className='book-details-status'>Status : <span className='status'>{bookDetails.readStatus}</span></p>
                        </div>
                    </div>
                    <hr className='hr-line'/>
                    <div className='book-details-author-book-container'>
                        <h1 className='about-author-book-title'>About Author</h1>
                        <p className='about-author-book-description'>{bookDetails.aboutAuthor}</p>
                    </div>
                    <div className='book-details-author-book-container'>
                        <h1 className='about-author-book-title'>About Book</h1>
                        <p className='about-author-book-description'>{bookDetails.aboutBook}</p>
                    </div>
                </div>
        )
    }

    renderApiStatusView = () => {
        const {apiStatus} = this.state
        switch(apiStatus){
            case "SUCCESS":
                return this.renderBookDetails()
            case "LOADING":
                return this.renderLoader()
            case "FAILURE":
                return this.renderFailureView()
            default:
                return null
        }
    }

    render(){
        const {history} = this.props
        return(
            <div>
                <Header history={history}/>
                <div className='book-details-footer-container'>
                    <div className='book-details-container'>
                        {this.renderApiStatusView()}
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default BookItemDetails