import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  render () {
    const { books, title, shelf, reloadShelf } = this.props

    let displayBooks = books.filter((book) => book.shelf === shelf)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {displayBooks.map((book)=> 
              <Book key={book.id} book={book} reloadShelf={(newShelves) => reloadShelf(newShelves)} />
            )}  
          </ol>
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  reloadShelf: PropTypes.func.isRequired,
}

export default Bookshelf
