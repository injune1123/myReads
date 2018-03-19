import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import BookListItem from './components/BookListItem'
import './App.css'
import default_book_cover from './img/default_book_cover.jpg'
import * as BooksAPI from './BooksAPI';


class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        myReads: [],
        searchResults: [],
        searchQuery: ''
    };

    updateSearchQuery = (newQuery) => {
        this.setState(//update the search input box UI
            {searchQuery:newQuery}
        )
        BooksAPI.search(newQuery, 10).then((searchedBooksOri) => {// get searchedBooks based on the query
            if(searchedBooksOri && searchedBooksOri.constructor === Array) {
                searchedBooksOri = this.formatBookData(searchedBooksOri);//format the data
                //merge books from search with users books on shelves
                let searchedBooks = this.mergeSearchedBooksAndmReads(searchedBooksOri, this.state.myReads);
                this.setState({searchResults:searchedBooks});// set state

            }
        })
    };

    mergeSearchedBooksAndmReads = function (searchedBooksOri, myReads){
        searchedBooksOri.forEach((book) =>{
            for (let i = 0; i < myReads.length ; i++){
                let curBookMyRead = myReads[i]
                if (book.id === curBookMyRead.id){
                    book.onShelf = curBookMyRead.onShelf  
                }
            }
        })
        return searchedBooksOri
    }

    formatBookData = (books) => {
        return books.map((book) => {
                return {
                    id: book.id,
                    title: book.title,
                    authors: book.authors,
                    imgURL: book.imageLinks ? book.imageLinks.thumbnail : default_book_cover,
                    onShelf: book.shelf || 'none',
                }
            }
        )
    }

    switchShelf = (shelfName, book) => {
        /* shall update myReads and searchResults state */
        var myReads = this.state.myReads;
        var searchResults = this.state.searchResults;
        var bookId = book.id;
        var onShelf = false;

        /* update the myReads state */
        // check whether the current book is in myReads
        for (let i = 0 ; i < myReads.length; i++){// if the current book is in myReads, find the book, and update the shelf
            if (myReads[i].id == bookId){
                myReads[i]["onShelf"] = shelfName;
                onShelf = true;
            }
        }
        // if not in myReads, add it to myReads
        !onShelf && myReads.push(book)

        /* update the searchResults */
        // check whether the book is in searchResutls
        for (let i = 0 ; i < searchResults.length; i++){ // if the current book is in searchResults, find the book, update the shelf
            if (searchResults[i].id == bookId){
                searchResults[i]["onShelf"] = shelfName;
            }
        }
        // update myReads and searchResults state
        this.setState({myReads: myReads})
        this.setState({searchResults: searchResults})
    };
    componentDidMount () {
        // set initial books on shelf
        BooksAPI.getAll().then((books) => {
            if(books && books.constructor === Array) {
                //format the data
                books = this.formatBookData(books);
                // set state
                this.setState({myReads:books});
            }
        }).then(
            // set initial book search
            BooksAPI.getAll().then((searchedBooksOri) => {
                if(searchedBooksOri && searchedBooksOri.constructor === Array) {
                    //format the data
                    searchedBooksOri = this.formatBookData(searchedBooksOri);
                    //merge books from search with users books on shelves
                    let searchedBooks = this.mergeSearchedBooksAndmReads(searchedBooksOri, this.state.myReads);
                    // set state
                    this.setState({searchResults:searchedBooks});
                }
            })
       )
    };
    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link className="close-search" to="/">Close</Link>
                            <div className="search-books-input-wrapper">
                                {/*
                                 NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                 You can find these search terms here:
                                 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                                 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                 you don't find a specific author or title. Every search is limited by search terms.
                                 */}
                                <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateSearchQuery(e.target.value)} value={this.state.searchQuery}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.searchResults.map(
                                    (book, index) => <BookListItem
                                        book={book}
                                        key={index}
                                        handleSelect = {this.switchShelf}
                                    />)}
                            </ol>
                        </div>
                    </div>
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {this.state.myReads
                                                .filter(
                                                    (books) => books.onShelf === 'currentlyReading'
                                                )
                                                .map(
                                                    (book, index) => <BookListItem
                                                        book={book}
                                                        key={index}
                                                        handleSelect = {this.switchShelf}
                                                    />
                                                )}

                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {this.state.myReads
                                                .filter(
                                                    (books) => books.onShelf === 'wantToRead'
                                                )
                                                .map(
                                                    (book, index) => <BookListItem
                                                        book={book}
                                                        key={index}
                                                        handleSelect = {this.switchShelf}
                                                    />
                                                )
                                            }
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {this.state.myReads
                                                .filter(
                                                    (books) => books.onShelf === 'read'
                                                )
                                                .map(
                                                    (book, index) => <BookListItem
                                                        book={book}
                                                        key={index}
                                                        handleSelect = {this.switchShelf}
                                                    />
                                                )
                                            }
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}
export default BooksApp