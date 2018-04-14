import React from 'react';
import PropTypes from 'prop-types'; 
import SearchResults from './SearchResults'
import SearchBar from './SearchBar'
 /*
 NOTES: The search from BooksAPI is limited to a particular set of search terms.
 You can find these search terms here:
 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
 you don't find a specific author or title. Every search is limited by search terms.
 */

function SearchBooks(props) {
  return (
  <div className="search-books">
      <SearchBar 
      updateSearchQuery = {props.updateSearchQuery}
      searchQuery = {props.searchQuery}
      />
      <SearchResults
          searchQuery = {props.searchQuery}
          searchResults={props.searchResults} 
          switchShelf={props.switchShelf}
      />
  </div>
  )
}

//requires two props: a book object , and a handleSelect function
SearchBooks.propTypes={
  updateSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  switchShelf: PropTypes.func.isRequired,
}

export default SearchBooks;