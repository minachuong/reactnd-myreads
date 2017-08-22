import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
        <Route path="/search" render={()=> (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
        <Route exact path="/" render={()=> (
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
                  reloadShelves={(newShelves) => this.getBooks()}
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
