import { Component } from "react";
import './index.css'

interface changeBookShelfInterface{
  changeBookShelf: (arg0: objectArgumentInterface) => void,
  selectedBookShelf: objectArgumentInterface
}

interface objectArgumentInterface{
  id: string, 
  value: string, 
  label: string
}

const bookshelvesList = [
    {
      id: '22526c8e-680e-4419-a041-b05cc239ece4',
      value: 'ALL',
      label: 'All',
    },
    {
      id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
      value: 'READ',
      label: 'Read',
    },
    {
      id: '2ab42512-3d05-4fba-8191-5122175b154e',
      value: 'CURRENTLY_READING',
      label: 'Currently Reading',
    },
    {
      id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
      value: 'WANT_TO_READ',
      label: 'Want to Read',
    },
  ]

class Shelfs extends Component <changeBookShelfInterface>{

    onClickBookShelf = (id: string) => {
      const {changeBookShelf} = this.props
      const [selectedObj] = bookshelvesList.filter((eachBookShelf) => eachBookShelf.id === id)
      changeBookShelf(selectedObj)
    }

    render(){
      const {selectedBookShelf} = this.props
        return(
            <div className="shelfs-container">
                <h1 className="bookshelves-title">Bookshelves</h1>
                <ul className="book-shelf-ul">
                    {bookshelvesList.map((eachBookShelve) => (
                        <li className="book-shelf-list" key={eachBookShelve.id}>
                            <button className={eachBookShelve.id === selectedBookShelf.id ? "each-book-button selected-each-book-button" : "each-book-button"} onClick={() => this.onClickBookShelf(eachBookShelve.id)}>{eachBookShelve.label}</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Shelfs