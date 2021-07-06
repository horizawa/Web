import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BookCover from "../utilities/BookCover";
import LoadingScreen from "../utilities/LoadingScreen";

class AuthorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {},
      books: []
    };
  }

  componentDidMount() {
    // Populate AuthorPage
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          "/authors/single/" +
          this.props.match.params.id
      )
      .then(res => {
        this.setState({
          author: res.data.author,
          books: res.data.books
        });
      });
  }

  // Function to generate descriptive text on whether or not the author has books
  booksByAuthorLabel() {
    if (this.state.books.length > 0) {
      return (
        <div className="margin-bottom-med">
          Books by {this.state.author.name}:
        </div>
      );
    } else {
      return (
        <div>{this.state.author.name} doesn&apos;t have any books yet!</div>
      );
    }
  }

  // Generate book covers to be displayed
  bookList() {
    return this.state.books.map(currentBook => {
      return <BookCover key={currentBook._id} currentBookCover={currentBook} />;
    });
  }

  deleteAuthor(id) {
    axios.delete(process.env.REACT_APP_BASE_URL + "/authors/" + id);
    return (window.location = "/authors");
  }

  render() {
    if (typeof this.state.author.name == "undefined") {
      return <LoadingScreen />;
    }

    return (
      <div className="container">
        <h3 className="center-align padding-bottom-small">
          {this.state.author.name}&apos;s Author Page
        </h3>

        <div className="row">
          <div className="col offset-l4 offset-m3 offset-s1">
            <Link
              to={"/authors/edit/" + this.state.author._id}
              className="btn deep-purple"
            >
              Edit Author
            </Link>
          </div>
          <div className="col m4 s3 margin-bottom-small">
            <button
              onClick={() => this.deleteAuthor(this.state.author._id)}
              className="btn red lighten-2"
            >
              Delete Author
            </button>
          </div>
        </div>

        <div className="center-align">
          <h5>{this.booksByAuthorLabel()}</h5>
          <div>{this.bookList()}</div>
        </div>
      </div>
    );
  }
}

export default AuthorPage;
