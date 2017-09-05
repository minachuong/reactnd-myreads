import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import SearchTerms from './SearchTerms';
import * as Humanize from 'humanize-plus';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
  state = {
    availableBooks: [],
    query: '',
  };
  
  search(query) {
    this.setState((prevState) => {
      return {
        ...prevState,
        query,
      };
    });
    this.updateQuery(query);
  };
    
  updateQuery(query) {
    if (SearchTerms.includes(Humanize.capitalizeAll(query)) === false) {
      BooksAPI.search(query, 20).then((response) => {
        if (Array.isArray(response)) {
          this.setState({
            availableBooks: response,
            query: query,  
          });
        };
      });
    };
  };

  assignShelfValue(book) {
    let shelvedBooksIds = this.props.books.map((shelvedBook) => shelvedBook.id);
    let shelfValue = shelvedBooksIds.includes(book.id) ? this.props.books.filter((shelvedBook) => shelvedBook.id === book.id)[0].shelf : "none";
    return shelfValue;
  };

  render() {
    const { query, availableBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={query} 
              onChange={(event) => this.search(event.target.value)} 
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {availableBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelf={this.assignShelfValue(book)}
                updateBook={(book, shelf) => this.props.updateBook(book, shelf)}
              />
            ))}
          </ol>
        </div>
      </div>
    ); 
  };
};

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired, 
};

export default SearchBooks
