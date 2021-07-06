import React from "react";
import { Link } from "react-router-dom";
let toastArr = [];

/* Functional component which:
  1. displays row consisting of Author name, view Link, edit Link & delete button
  2. Contains the functionality of the Toast error message for deletes.
 */
const AuthorTable = props => (
  <tr>
    <td>{props.author.name}</td>

    <td>
      <Link to={"/authors/" + props.author._id} className="btn deep-purple">
        View
      </Link>
      &nbsp;
      <Link to={"/authors/edit/" + props.author._id} className="btn black">
        Edit
      </Link>
      &nbsp;
      <button
        onClick={() => {
          if (
            !toastArr.includes(props.author._id) &&
            props.books.includes(props.author._id)
          ) {
            M.toast({ html: "Cannot Delete. Author still has books." });
            toastArr.push(props.author._id);
          } else {
            props.deleteAuthor(props.author._id);
          }
        }}
        className="btn red lighten-2"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default AuthorTable;
