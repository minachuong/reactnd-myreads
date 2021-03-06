import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import { Link, Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfCategories: [
      {
        'title': 'Currently Reading', 
        'shelf': 'currentlyReading'
      },
      {
        'title': 'Want to Read', 
        'shelf': 'wantToRead'
      },
      {
        'title': 'Read', 
        'shelf': 'read'
      },
    ],
  };

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }; 
  
  updateBook(book, newShelf) {
    BooksAPI.update(book, newShelf).then(() => {
      this.getBooks();
    }); 
  }; 

  componentDidMount() {
    this.getBooks();
  };
  
  render() {
    const { books, shelfCategories } = this.state;

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            books={books}
            updateBook={(book, shelf) => this.updateBook(book, shelf)}
          />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {shelfCategories.map((category) => (
                <Bookshelf 
                  books={books} 
                  title={category['title']} 
                  shelf={category['shelf']} 
                  key={category['shelf']} 
                  updateBook={(book, shelf) => this.updateBook(book, shelf)}
                />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    );
  };
};

export default BooksApp
