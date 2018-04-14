import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import BookListItem from './components/BookListItem'
import SearchBooks from './components/SearchBooks/SearchBooks'
import Bookshelf from './components/Bookshelf'

import './App.css'
import default_book_cover from './img/default_book_cover.jpg'
import * as BooksAPI from './BooksAPI';

let shelfTierInfo =[{name:"Currently Reading", value:"currentlyReading"},
                    {name:"Want to Read", value:"wantToRead"},
                    {name:"Read", value:"read"}]

class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        myReads: [],
        searchResults: [],
        searchQuery: '',
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
        var myReads = [ ... this.state.myReads];
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
        //persist updated book info using api
        BooksAPI.update(book,shelfName)

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
        })
    };
    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <SearchBooks
                        updateSearchQuery = {this.updateSearchQuery}
                        searchQuery = {this.state.searchQuery}
                        searchResults={this.state.searchResults}
                        switchShelf={this.switchShelf}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {shelfTierInfo.map(shelfTier=>
                                    <Bookshelf
                                    shelfName = {shelfTier.name}
                                    reads = {this.state.myReads}
                                    switchShelf={this.switchShelf}
                                    shelfMatchingString={shelfTier.value}
                                    />
                                )}
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