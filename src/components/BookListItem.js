/* 
Individual book item
It displays book info, including a book cover, book title, and authors
It also contains shelf info. Users can change the selected shelf value through the "hange shelf" icon
*/
import React from 'react';
import PropTypes from 'prop-types';
/*stateless function is used since it only rertuns some UI*/
function BookListItem (props) {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    {/* bookcover */}
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imgURL})` }}></div>
                    {/* book shelf info change button*/}	
                    <div className="book-shelf-changer">
                            <select onChange={(e) => {
                                props.handleSelect(e.target.value, props.book)
                            }} value={props.book.onShelf || 'none'}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                {/* Book title */}
                <div className="book-title">{props.book.title}</div>
                {/* Book authors */}
                {props.book.authors && props.book.authors.map((author, index)=> <div className="book-authors" key={index}>{author}</div>)}
            </div>
        </li>
    )
}

//requires two props: a book object , and a handleSelect function
BookListItem.propTypes={
	book: PropTypes.object.isRequired,
	handleSelect: PropTypes.func.isRequired
}
export default BookListItem;
