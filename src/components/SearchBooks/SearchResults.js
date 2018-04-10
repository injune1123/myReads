import React from 'react';
import PropTypes from 'prop-types';
import BookListItem from '../BookListItem';

/*stateless function is used since it only rertuns some UI of the search results*/
function SearchResults (props){
  return (
    <div className="search-books-results">
      <ol className="books-grid">
          {props.searchResults.map(
              (book, index) => <BookListItem
                  book={book}
                  key={index}
                  handleSelect = {props.switchShelf}
              />
          )}
      </ol>
    </div>
  )
}

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  switchShelf: PropTypes.func.isRequired,
}

export default SearchResults;
