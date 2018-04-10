import React from 'react'
import PropTypes from 'prop-types'
import BookListItem from './BookListItem'

function Bookshelf (props){
  return (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelfName}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.reads
                    .filter(
                        (books) => books.onShelf === props.shelfMatchingString
                    )
                    .map(
                        (book, index) => <BookListItem
                            book={book}
                            key={index}
                            handleSelect = {props.switchShelf}
                        />
                    )}
            </ol>
        </div>
    </div>
  )
}

Bookshelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  reads: PropTypes.array.isRequired,
  switchShelf: PropTypes.func.isRequired,
  shelfMatchingString: PropTypes.string.isRequired,
}

export default Bookshelf;