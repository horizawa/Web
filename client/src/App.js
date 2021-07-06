import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";

// Import components
import Navbar from "./components/utilities/Navbar";
import Index from "./components/Index";
import AuthorsView from "./components/Author/AuthorsView";
import HandleAuthor from "./components/Author/HandleAuthor";
import AuthorPage from "./components/Author/AuthorPage";

import HandleBookLists from "./components/Book/HandleBookLists";
import HandleBook from "./components/Book/HandleBook";
import BookPage from "./components/Book/BookPage";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Switch>
        <Route path="/" exact component={Index} />

        <Route path="/authors" exact component={AuthorsView} />
        <Route
          path="/authors/new"
          component={props => (
            <HandleAuthor timestamp={new Date().toString()} {...props} />
          )}
        />
        <Route path="/authors/:id" exact component={AuthorPage} />
        <Route path="/authors/edit/:id" component={HandleAuthor} />
        <Route path="/books/unread" component={HandleBookLists} />
        <Route path="/books/finished" component={HandleBookLists} />
        <Route
          path="/books/new"
          component={props => (
            <HandleBook timestamp={new Date().toString()} {...props} />
          )}
        />
        <Route path="/books/:id" exact component={BookPage} />
        <Route path="/books/edit/:id" component={HandleBook} />
      </Switch>
    </Router>
  );
}

render(<App />, document.getElementById("root"));
