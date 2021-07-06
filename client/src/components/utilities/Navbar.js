import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav-wrapper deep-purple">
        <div className="container">
          <Link to="/" className="brand-logo">
            Book Details{" "}
            <span
              role="img"
              aria-label="logo"
              className="hide-on-small-and-down"
            >
              📚
            </span>
          </Link>
          <Link
            to="#"
            className="sidenav-trigger right"
            data-target="mobile-links"
          >
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/authors" className="waves-effect">
                Authors
              </Link>
            </li>
            <li>
              <Link to="/authors/new" className="waves-effect">
                Add Author
              </Link>
            </li>
            <li>
              <Link to="/books/unread" className="waves-effect">
                Books To Read
              </Link>
            </li>
            <li>
              <Link to="/books/finished" className="waves-effect">
                Finished Books
              </Link>
            </li>
            <li>
              <Link to="/books/new" className="waves-effect">
                Add Book
              </Link>
            </li>
          </ul>
        </div>

        <ul className="sidenav" id="mobile-links">
          <li>
            <Link to="/authors" className="waves-effect">
              Authors
            </Link>
          </li>
          <li>
            <Link to="/authors/new" className="waves-effect">
              Add Author
            </Link>
          </li>
          <li>
            <Link to="/books/unread" className="waves-effect">
              Books To Read
            </Link>
          </li>
          <li>
            <Link to="/books/finished" className="waves-effect">
              Finished Books
            </Link>
          </li>
          <li>
            <Link to="/books/new" className="waves-effect">
              Add Book
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
