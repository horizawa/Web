import React from "react";
import { Link } from "react-router-dom";

// Convert buffer from mongoDB to base64 string
const arrayBufferToBase64 = buffer => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

const BookCover = props => (
  <span className="book-icon">
    <Link to={"/books/" + props.currentBookCover._id}>
      <img
        height="150"
        width="100"
        alt="book cover"
        src={
          "data:image/jpeg;base64," +
          arrayBufferToBase64(props.currentBookCover.coverImage.data)
        }
      />
    </Link>
  </span>
);

export default BookCover;
