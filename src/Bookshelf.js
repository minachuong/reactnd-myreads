import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const Bookshelf = ({ books, title, shelf, reloadShelves, updateBook }) => {

  let displayBooks = books.filter((book) => book.shelf === shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {displayBooks.map((book)=> 
            <Book
              key={book.id} 
              book={book} 
              reloadShelf={() => reloadShelves()} 
              updateBook={(book, shelf) => updateBook(book, shelf)}
            />
          )}  
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  reloadShelves: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
};

export default Bookshelf
