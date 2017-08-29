import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import SearchTerms from './SearchTerms'
import * as Humanize from 'humanize-plus'

class SearchBooks extends Component {
  state = {
    availableBooks: [],
    query: "",
  }
  
  search = (query) => {
    if (SearchTerms.includes(Humanize.capitalizeAll(query)) === false) {
      this.setState({ query: query })
    } else {
      BooksAPI.search(query, 50).then((response) => { 
        if (Array.isArray(response)) {
          let unshelvedBooks = response.filter((book) => this.props.books.map((shelvedBook) => shelvedBook.id).includes(book.id) === false)
          this.setState({ 
            availableBooks: unshelvedBooks,
            query: query,
          })
        }  
      }) 
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={this.state.query} 
              onChange={(event) => this.search(event.target.value)} 
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.availableBooks.map((book) => (
               <Book key={book.id} book={book} reloadShelf={() => this.props.reloadShelves()} />
            ))}
          </ol>
        </div>
      </div>
    ) 
  }
}

SearchBooks.propTypes = {
}

export default SearchBooks