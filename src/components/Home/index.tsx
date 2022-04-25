import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import { Link, RouteComponentProps } from "react-router-dom"
import Slider from "react-slick";
import './index.css'

interface HeaderHistoryProps {
    history: RouteComponentProps,
}

interface ApiConstantsInterface{
    initial: string,
    loading: string,
    success: string,
    failure: string
}

interface TopRatedBooksInterface{
    author_name: string,
    cover_pic: string,
    id: string,
    title: string,
}

const apiConstants: ApiConstantsInterface = {
    initial: "INITIAL",
    loading: "LOADING",
    success: "SUCCESS",
    failure: "FAILURE"
}

class Home extends Component <RouteComponentProps>{

    state = {
        apiStatus: apiConstants.initial,
        topRatedBooks: []
    }

    componentDidMount(){
        this.getTopRatedFetchedBooks()
    }

    getTopRatedFetchedBooks = async () => {
        const jwtToken = Cookies.get("jwt_token")
        this.setState({
            apiStatus: apiConstants.loading
        })

        const url = "https://apis.ccbp.in/book-hub/top-rated-books"
        const options = {
            method: "GET",
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url, options)
        // console.log(response)
        if(response.ok){
            const data = await response.json()

            const updatedData = data.books.map((eachData: TopRatedBooksInterface) => ({
                authorName: eachData.author_name,
                coverPic: eachData.cover_pic,
                id: eachData.id,
                title: eachData.title      
            }))

            this.setState({
                topRatedBooks: updatedData,
                apiStatus: apiConstants.success
            })
        }
        else{
            this.setState({
                apiStatus: apiConstants.failure
            })
        }
    }

    renderLoader = () => (
        <div className='home-loader-container'>
            <div className="products-loader-container">
                <Loader type={'TailSpin'} color="#0284C7" height={50} width={50}/>
            </div>
        </div>
    )  
    

    renderReacSlick = (): any => { // TODO:
        const {topRatedBooks} = this.state
        // console.log(topRatedBooks)

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
            ]
          };

          return (
            <Slider {...settings}>
              {topRatedBooks.map((eachLogo) => {
                const { title, id, authorName, coverPic } = eachLogo;
                return (
                    <div className="slick-item" key={id}>
                        <div className='slick-image-container'>
                            <Link to={`/books/${id}`} className="carousel-book-link">
                                <img
                                    className="logo-image"
                                    src={coverPic}
                                    alt="company logo"
                                />
                                <div className='book-details-carousel-container'>
                                    <h1 className='book-title'>{title}</h1>
                                    <p className='book-author'>{authorName}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
              })}
            </Slider>
          );
    }

    renderFailureView = () => <FailureView tryAgain={this.getTopRatedFetchedBooks}/>

    renderRespectiveStatusViews = () =>{
        const {apiStatus} = this.state
        switch(apiStatus){
            case "SUCCESS":
                return this.renderReacSlick()
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
            <div className='home-header-main-container'>
                <Header history={history}/>
                <div className='home-header-container'>
                    <div className='home-container'>
                        <div className='text-container'>
                            <h1 className='heading'>Find Your Next Favourite Books?</h1>
                            <p className='description'>You are in the right place. Tell us what titles or genres you have enjoyed in the past, 
                                and we will give you surprisingly insightful recommendations.</p>
                                <Link className="carousel-book-link" to="/shelf"><button className='find-books-btn small-device-find-btn'>Find Books</button></Link>
                        </div>
                        <div className='top-rated-carousel-container'>
                            <div className='top-rated-container'>
                                <h1 className='title'>Top Rated Books</h1>
                                <Link className="carousel-book-link" to="/shelf"><button className='find-books-btn large-device-find-btn'>Find Books</button></Link>
                            </div>
                            <div className='render-all-views'>{this.renderRespectiveStatusViews()}</div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Home