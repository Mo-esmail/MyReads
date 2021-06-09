import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route,Link} from "react-router-dom";
import Search from "./Components/Search"
import BookShelf from "./Components/BookShelf";

class BooksApp extends React.Component {
  state = {
      books:[]
  }
  componentDidMount() {
      this.fetchBooks();
  }
  moveBook=async (book,shelf)=>{
      await BooksAPI.update(book,shelf).then(res=>{

          BooksAPI.getAll().then(current => {
              this.setState({
                  books: current
              });
          });

      })
}

    render() {
      console.log(this.state.books)
    return (
      <div className="app">
          <Route exact path="/" render={() => <div className="list-books">
    <div className="list-books-title">
        <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
        <div>
            {[{bookshelfTitle:"Currently Reading",type:"currentlyReading"},{bookshelfTitle:"Want To Read",type:"wantToRead"},{bookshelfTitle:"Read",type:"read"}].map((currentShelf ,idx)=>
                <BookShelf key={currentShelf.type + idx} bookshelfTitle={currentShelf.bookshelfTitle} type={currentShelf.type} moveBook={this.moveBook} books={this.state.books.filter(book=> book.shelf === currentShelf.type)}/>
            )}
        </div>
    </div>
    <div className="open-search">
        <Link to={"searchLibrary"}>Add a book</Link>
    </div>
</div>}/>
          <Route path="/searchLibrary" render={() => <Search moveBook={this.moveBook} books={this.state.books} />}/>
      </div>
    )
  }
  async fetchBooks(){
      const books= await BooksAPI.getAll()
      this.setState({books})
  }
}

export default BooksApp
