import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Books extends Component {
  updateBook (book, newShelf) {
    BooksAPI.update(book, newShelf).then((response) => {
      this.props.reloadShelf(response)
    })
  }
  
  render() {
    const { book } = this.props;

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => this.updateBook(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors.map((author) => (
            <div className="book-authors" key={author}>{author}</div>
          ))}
        </div>
      </li> 
    ) 
  }
}

Books.propTypes = {
  book: PropTypes.object.isRequired,
  reloadShelf: PropTypes.func.isRequired,
}

export default Books
