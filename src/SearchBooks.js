import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    availableBooks: [],
    query: "",
  }
  
  search = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then((response) => { 
      this.setState({ 
        availableBooks: response,
        query: query,
      })
    })
  }

  componentDidMount() {
  }

  render() {
    return (
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
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={this.state.query} 
              onChange={(event, maxResults) => this.search(event.target.value, 50)} 
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.availableBooks !== [] ? (
              console.log(this.state)
             // this.state.availableBooks.map((book) => (
             //   <Book key={book.id} book={book} />
             // ))
            ) : ( null )}
          </ol>
        </div>
      </div>
    ) 
  }
}

SearchBooks.propTypes = {
}

export default SearchBooks
