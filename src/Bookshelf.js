import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {

  render () {
    const { books, title, shelf } = this.props

    let displayBooks = books.filter((book) => book.shelf === shelf)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {displayBooks.map((book)=> 
              <Book key={book.id} book={book} />
            )}  
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
