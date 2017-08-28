import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Link, Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfCategories: [
      {
        "title": "Currently Reading", 
        "shelf": "currentlyReading"
      },
      {
        "title": "Want to Read", 
        "shelf": "wantToRead"
      },
      {
        "title":"Read", 
        "shelf": "read"
      },
    ],
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  } 
  
  componentDidMount() {
    this.getBooks();
  }
  
  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks books={books} reloadShelves={() => this.getBooks()} />
        )} />
        <Route exact path="/" render={() => (
           <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {this.state.shelfCategories.map((category) => (
                <Bookshelf 
                  books={books} 
                  title={category["title"]} 
                  shelf={category["shelf"]} 
                  key={category["shelf"]} 
                  reloadShelves={() => this.getBooks()}
                />
              ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
