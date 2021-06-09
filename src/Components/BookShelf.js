import React, {Component} from 'react';
import Book from "./Book";

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(currentBook=><li><Book key={currentBook.id} book={currentBook} moveBook={this.props.moveBook}/></li>)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;