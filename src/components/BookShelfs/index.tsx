import {Component} from 'react'
import Header from '../Header'
import { Link, RouteComponentProps } from "react-router-dom"
import './index.css'
import Shelfs from '../shelfs'
import { BsSearch, BsStarFill } from 'react-icons/bs'
import Cookies from 'js-cookie'
import BookShelfEachBook from '../BookShelfEachBook'
import Footer from '../Footer'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'

interface ApiConstantsInterface{
    initial: string,
    loading: string,
    success: string,
    noBooks: string,
    failure: string
}

interface EachBookInterface{
    author_name: string,
    cover_pic: string,
    id: string,
    rating: number,
    read_status: string,
    title: string
}

interface ModifiedEachBookInterface{
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
    noBooks: "NOBOOKS",
    failure: "FAILURE"
}

class BookShelfs extends Component <RouteComponentProps>{
    state = {
        apiStatus: apiConstants.initial,
        selectedBookShelf: {
            id: '22526c8e-680e-4419-a041-b05cc239ece4',
            value: 'ALL',
            label: 'All',
        },
        searchInput: "",
        booksData: []
    }

    componentDidMount(){
        this.getBooksData()
    }

    getBooksData = async () => {
        this.setState({
            apiStatus: apiConstants.loading
        })

        const {searchInput, selectedBookShelf} = this.state
        const jwtToken = Cookies.get("jwt_token")

        const url = `https://apis.ccbp.in/book-hub/books?shelf=${selectedBookShelf.value}&search=${searchInput}`
        const options = {
            method: "GET",
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        }
        
        const response = await fetch(url, options)
        // console.log(url, response)
        if(response.ok){
            const dataJson = await response.json()
            const data = dataJson.books
            const updatedData = data.map((eachBook: EachBookInterface) => ({
                authorName: eachBook.author_name,
                coverPic: eachBook.cover_pic,
                id: eachBook.id,
                rating: eachBook.rating,
                readStatus: eachBook.read_status,
                title: eachBook.title
            }))
            this.setState({
                booksData: updatedData,
                apiStatus: apiConstants.success
            })
        }
        else{
            this.setState({
                apiStatus: apiConstants.failure
            })
        }

    }

    onChangeSearchInput = (event: React.FormEvent<HTMLInputElement>) =>{
        console.log(event.currentTarget.value)
        this.setState({
            searchInput: event.currentTarget.value
        })
    }

    changeBookShelf = (obj: {id: string, value: string, label: string}) => {
        this.setState({
            selectedBookShelf: obj
        }, this.getBooksData)
    }

    renderLoader = () => (
        <div className='loader-container'>
            <div className="products-loader-container">
                <Loader type={'TailSpin'} color="#0284C7" height={50} width={50}/>
            </div>
        </div>
    )

    renderFailure = () => <div>
            
            <div className='book-shelf-failure-view-container'>
                <FailureView tryAgain={this.getBooksData}/>
            </div>
        </div>

    renderNoSelectedBooks = () => {
        const {searchInput} = this.state
        return(
            <div>
                <div className='no-books-search-container'>
                    <img src="https://res.cloudinary.com/degjdup40/image/upload/v1650894063/Asset_1_1_ynawpe.png" alt="no search books" className='no-searched-books-image'/>
                    <h1 className='no-search-books-text'>{`You search for ${searchInput} did not find any matches.`}</h1>
                </div>
            </div>
        )
    }

    renderSearchInputSection = () => {
        const {selectedBookShelf, searchInput} = this.state
        return(
            <div className='title-search-input-container'>
                <h1 className='selected-books-title'>{`${selectedBookShelf.label} Books`}</h1>
                <div className='search-input-container'>
                    <input type="text" placeholder='Search' value={searchInput} className="search-input" onChange={this.onChangeSearchInput}/>
                    <button className='search-button' onClick={this.getBooksData}>
                        <BsSearch className='search-icon'/>
                    </button>
                </div>
            </div>
        )
    }

    renderBooksSection = () => {
        const {selectedBookShelf, booksData} = this.state
        return(
            <div className='books-search-input-container'>
                <div>
                    <ul className='Book-shelf-ul-ele'>
                        {booksData.map((eachBook: ModifiedEachBookInterface) => (
                            <BookShelfEachBook key={eachBook.id} eachBook={eachBook}/>
                        ))}
                    </ul>
                </div>
                <Footer/>
            </div>
        )
    }

    renderBookShelveAllViews = () => {
        const {apiStatus, booksData} = this.state
        switch(apiStatus){
            case "SUCCESS":
                // console.log(apiStatus)
                if(booksData.length > 0){
                    return this.renderBooksSection()
                }
                return this.renderNoSelectedBooks()
            case "LOADING":
                return this.renderLoader()
            case "FAILURE":
                return this.renderFailure()
            default:
                return null
        }
    }

    render(){
        const {history} = this.props
        const {selectedBookShelf, searchInput} = this.state
        return(
            <div className='book-shelf-header-footer-main-container'>
                <Header history={history}/>
                <div className='shelfs-bookselves-footer-main-container'>
                    <div className='shelfs-bookselves-footer-container'>
                        <div className='search-input-small-device-container'>
                            <input type="text" placeholder='Search' value={searchInput} className="search-input" onChange={this.onChangeSearchInput}/>
                            <button className='search-button' onClick={this.getBooksData}>
                                <BsSearch className='search-icon'/>
                            </button>
                        </div>
                        <Shelfs changeBookShelf={this.changeBookShelf} selectedBookShelf={selectedBookShelf}/>
                        <div className='bookselves-footer-container'>
                            <div className='bookselves-container'>
                                {this.renderSearchInputSection()}
                                {this.renderBookShelveAllViews()}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelfs