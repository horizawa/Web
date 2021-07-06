import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";
import { Link } from "react-router-dom";
import LoadingScreen from "../utilities/LoadingScreen";

class BookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: null
    };
  }

  // Populate state with book data
  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          "/books/single/" +
          this.props.match.params.id
      )
      .then(res => {
        this.setState({
          book: res.data
        });
      });
  }

  bookDetails() {
    return (
      <div className="container center-align">
        <h3>{this.state.book.title}</h3>
        <BookCover
          key={this.state.book._id}
          currentBookCover={this.state.book}
        />
        <p>
          <span className="book-field">Author:</span>
          <Link to={"/authors/" + this.state.book.author._id}>
            &nbsp;
            {this.state.book.author.name}
          </Link>
        </p>
        <p>
          <span className="book-field">Publish Date: </span>
          {new Date(this.state.book.publishDate).toDateString()}
        </p>
        <p>
          <span className="book-field">Need to Read: </span>
          {this.state.book.unread ? "Yes" : "No"}
        </p>
        <p>
          <span className="book-field">Page Count: </span>
          {this.state.book.pageCount}
        </p>
        <p>
          <span className="book-field">Why I want to read it: </span>
          {this.state.book.description}
        </p>
      </div>
    );
  }

  deleteAuthor(id) {
    axios.delete(process.env.REACT_APP_BASE_URL + "/books/" + id);

    window.location = "/";
  }

  render() {
    if (this.state.book == null) {
      return <LoadingScreen />;
    }
    return (
      <div>
        <div>{this.state.book && this.bookDetails()}</div>
        <div className="row">
          <div className="col offset-l5 offset-m5 s1 offset-s3">
            <Link
              to={"/books/edit/" + this.props.match.params.id}
              className="btn deep-purple"
            >
              Edit
            </Link>
          </div>
          <div className="col l2 offset-m1 offset-s2">
            <button
              onClick={() => this.deleteAuthor(this.props.match.params.id)}
              className="btn red lighten-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookPage;
