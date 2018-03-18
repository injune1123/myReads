import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css'
import default_book_cover from './img/default_book_cover.jpg'

class BookListItem extends React.Component{

    render(){
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imgURL})` }}></div>
                        <div className="book-shelf-changer">
                                <select onChange={(e) => {
                                    this.props.handleSelect(e.target.value, this.props.book)
                                }} value={this.props.book.onShelf || 'none'}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    {this.props.book.authors && this.props.book.authors.map((author, index)=> <div className="book-authors" key={index}>{author}</div>)}
                </div>
            </li>
        )
    };
}

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        myReads: [
            {
                title:'To Kill a Mockingbird',
                authors:['Harper Lee'],
                imgURL:'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
                onShelf: 'currentlyReading',
            },
            {
                title:"Gender's Game",
                authors:['Harper Lee'],
                imgURL:'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
                onShelf: 'currentlyReading',
            },
            {
                title:'1776',
                authors:['David McCullough'],
                imgURL:'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
                onShelf: 'wantToRead',
            },
            {
                title:"Harry Potter and the Sorcerer's Stone",
                authors:['Harper Lee'],
                imgURL:'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
                onShelf: 'wantToRead',
            },
            {

                title:'The Hobbit',
                authors:['J.R.R. Tolkien'],
                imgURL:'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
                onShelf: 'read',
            },
            {
                title:"Oh, the Places You'll Go!",
                authors:['Seuss'],
                imgURL:'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
                onShelf: 'read',
            },
            {
                title:"The Adventures of Tom Sawyer",
                authors:['Mark Twain'],
                imgURL:'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
                onShelf: 'read',
            },

        ],
        searchResults: [
        ],
        searchQuery: ''
    };

    updateSearchQuery = (newQuery) => {
        this.setState(
            {searchQuery:newQuery.trim()}
        )
        BooksAPI.search(newQuery, 10).then((books) => {

            // get books based on the query
            console.log("after search API call", books)

            //format the data
            if(books && books.constructor === Array) {
                // set state
                books = this.formatBookData(books);
                this.setState({searchResults:books});

                console.log("this.setState?", this.setState)
            }
        })
    };

    formatBookData = (books) => {
        return books.map((book) => {
                return {
                    title: book.title,
                    authors: book.authors,
                    imgURL: book.imageLinks ? book.imageLinks.thumbnail : default_book_cover,
                    onShelf: 'none',
                }
            }
        )
    }

    switchShelf = (shelfName, book) => {
        //clone array
        let updatedReads = this.state.myReads.slice();
        //update the array
        // find the book in my Reads
        let indexOfBook = this.state.myReads.indexOf(book);

        if (indexOfBook !== -1) {
            updatedReads[indexOfBook]["onShelf"] = shelfName;
            this.setState(
                {myReads: updatedReads}
            )
        }else{
            book["onShelf"] = shelfName;
            updatedReads.push(book);
            console.log("updatedReads", updatedReads);
            this.setState(
                {myReads: updatedReads}
            )
        }

        let updatedSearchResults = this.state.searchResults.slice();

        let indexOfSearchResults = this.state.searchResults.indexOf(book);
        if (indexOfSearchResults !== -1){
            updatedSearchResults[indexOfSearchResults]["onShelf"] = shelfName;
            this.setState(
                {searchResults: updatedSearchResults}
            )
        }

    };
    componentDidMount () {

        BooksAPI.getAll().then((books) => {
            if(books && books.constructor === Array) {
                //format the data
                books = this.formatBookData(books);
                // set state
                this.setState({searchResults:books});
            }
        })

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