import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  state = {
    shelvedBooks: [],
  };

  assignShelfValue (book) {
    let shelvedBooksIds = this.state.shelvedBooks.map((shelvedBook) => shelvedBook.id);
    let shelfValue = shelvedBooksIds.includes(book.id) ? this.props.shelvedBooks.filter((shelvedBook) => shelvedBook.id === book.id)[0].shelf : "none";
    return shelfValue;
  };

  componentDidMount() {
    this.setState({ shelvedBooks: this.props.shelvedBooks });
  };

  render() {
    const { book, updateBook } = this.props;

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover" 
              style={{ 
                width: 128, 
                height: 193, 
                backgroundImage: `url(${book.imageLinks.thumbnail})` 
              }}>
            </div>
            <div className="book-shelf-changer">
              <select 
                value={book.shelf !== undefined ? book.shelf : this.assignShelfValue(book)}
                onChange={(event) => updateBook(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors === undefined ? (
            <div className="book-authors" >N/A</div>
          ) : (
            book.authors.map((author) => (
              <div className="book-authors" key={author}>{author}</div>
            ))
          )}
        </div>
      </li> 
    ); 
  };
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  reloadShelf: PropTypes.func.isRequired,
  shelvedBooks: PropTypes.array,
  updateBook: PropTypes.func.isRequired,
};

export default Book
