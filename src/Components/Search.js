import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Book from "./Book";
import {search} from "../BooksAPI";

class Search extends Component {
    state={
        booksFound:[]
    }
    sreachLibrary=async(query)=>{
        if(query){
            const books=await search(query)
                let oldBooks=!books.error? books.map(b=>{
                    if(this.props.books.some(book=>book.id===b.id)){
                        b.shelf=this.props.books.find(x=>x.id===b.id).shelf
                    }
                    return b
                }):[]
                this.setState({
                    booksFound: oldBooks
                })
        }else {
            this.setState({
                books: []
            });
        }

    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={"/"}>Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" onChange={(event) =>this.sreachLibrary(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.booksFound.map(book=><Book moveBook={this.props.moveBook} key={book.id} book={book}/>)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;