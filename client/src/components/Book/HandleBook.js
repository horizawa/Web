import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../utilities/LoadingScreen";

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import React FilePond & styles
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

// Import Encode, Image Preview & Image Resize
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

// Register plugins
registerPlugin(FilePondPluginFileEncode);
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginImageResize);
registerPlugin(FilePondPluginImageTransform);

class HandleBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublishDate = this.onChangePublishDate.bind(this);
    this.onChangeUnread = this.onChangeUnread.bind(this);
    this.onChangePageCount = this.onChangePageCount.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      author: "",
      title: "",
      publishDate: new Date(),
      unread: true,
      pageCount: "",
      cover: "",
      coverImageType: "",
      description: "",
      authors: [],
      booleans: [{ value: "Yes", id: true }, { value: "No", id: false }],
      paramNumbers: Object.keys(this.props.match.params).length,
      newBook: ""
    };
  }

  // Populate state with book data & array of authors to populate form dropdown
  componentDidMount() {
    // Get all authors for the dropdown in the add/edit book form
    axios.get(process.env.REACT_APP_BASE_URL + "/authors/all").then(res => {
      if (res.data.length > 0) {
        this.setState({
          authors: res.data,
          author: res.data[0]._id
        });
      }
    });
    if (this.state.paramNumbers > 0) {
      axios
        .get(
          process.env.REACT_APP_BASE_URL +
            "/books/single/" +
            this.props.match.params.id
        )
        .then(res => {
          if (res.data) {
            this.setState({
              author: res.data.author._id,
              title: res.data.title,
              publishDate: new Date(res.data.publishDate),
              unread: res.data.unread,
              pageCount: res.data.pageCount,
              cover: res.data.coverImage,
              coverImageType: res.data.coverImageType,
              description: res.data.description
            });
          }
        });
    }
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangePublishDate(date) {
    this.setState({
      publishDate: date
    });
  }

  onChangeUnread(e) {
    this.setState({
      unread: e.target.value
    });
  }

  onChangePageCount(e) {
    this.setState({
      pageCount: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  /* The following three functions render page name, submit button
  and cancel Link ('redirection') based on whether or not the URL
  contains an ID (editing author) */

  handlePageName() {
    if (this.state.paramNumbers < 1) {
      return <h3 className="center-align">Add a book</h3>;
    } else {
      return <h3 className="center-align">Edit book</h3>;
    }
  }

  handleSubmitBtn() {
    if (this.state.paramNumbers < 1) {
      return (
        <button type="submit" className="btn deep-purple">
          Add Book
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn deep-purple">
          Save
        </button>
      );
    }
  }

  cancelForm() {
    if (this.state.paramNumbers < 1) {
      return (
        <Link to={"/"} className="btn red lighten-2">
          Cancel
        </Link>
      );
    } else {
      return (
        <Link
          to={"/books/" + this.props.match.params.id}
          className="btn red lighten-2"
        >
          Cancel
        </Link>
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const book = {
      author: this.state.author,
      title: this.state.title,
      publishDate: this.state.publishDate,
      unread: this.state.unread,
      pageCount: this.state.pageCount,
      cover: this.state.cover,
      coverImageType: this.state.coverImageType,
      description: this.state.description
    };

    // Axios requests to update/post data depending on whether URL contains an ID
    if (this.state.paramNumbers < 1) {
      axios
        .post(process.env.REACT_APP_BASE_URL + "/books/new", book)
        .then(res => res.data)
        .then(this.setState({ newBook: "Yes" }));
      window.location = "/authors/" + this.state.author;
    } else {
      /* newBook variable utilized to re-render component 
      for either addition or edit of book fields */

      axios
        .put(
          process.env.REACT_APP_BASE_URL +
            "/books/edit/" +
            this.props.match.params.id,
          book
        )
        .then(this.setState({ newBook: "No" }));

      window.location = "/books/" + this.props.match.params.id;
    }
  }

  render() {
    if (!this.state.authors.length) {
      return <LoadingScreen />;
    }

    return (
      <div className="container">
        <div className="padding-bottom-small">{this.handlePageName()}</div>

        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col l4 offset-l2 m5 offset-m1">
              <input
                type="text"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
              <label htmlFor="title" className="active">
                Title
              </label>
            </div>

            <div className="input-field col l4 offset-l1 m5 offset-m1">
              <input
                type="number"
                required
                value={this.state.pageCount}
                onChange={this.onChangePageCount}
                name="pageCount"
                min="1"
              />
              <label htmlFor="pageCount" className="active">
                # of Pages
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col l4 offset-l2 m5 offset-m1 margin-bottom-small">
              <label>Author</label>
              <select
                selected
                value={this.state.author}
                onChange={this.onChangeAuthor}
                className="browser-default margin-top-small"
                required
              >
                {this.state.authors.map(function(name) {
                  return (
                    <option key={name._id} value={name._id}>
                      {name.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col l2 offset-l1 m3 offset-m1">
              <label>Need to read</label>
              <select
                value={this.state.unread}
                onChange={this.onChangeUnread}
                className="browser-default margin-top-small"
                required
              >
                {this.state.booleans.map(function(bool) {
                  return (
                    <option key={bool.id} value={bool.id}>
                      {bool.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col l3 offset-l2 m4 offset-m1 margin-bottom-large">
              <div className="coverBox">
                <label>Book Cover</label>
                <FilePond
                  stylePanelAspectRatio="1 / 1"
                  imageResizeTargetWidth="100"
                  imageResizeTargetHeight="150"
                  onaddfile={(err, file) => {
                    this.setState({
                      cover: file.getFileEncodeBase64String(),
                      coverImageType: file.fileType
                    });
                  }}
                ></FilePond>
              </div>
            </div>

            <div className="col l4 offset-l2 m6 offset-m1 s4">
              <label>Date Published:</label>
              <DatePicker
                selected={this.state.publishDate}
                onChange={this.onChangePublishDate}
                className="second-font center-align"
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col l8 offset-l2 m10 offset-m1 s12">
              <textarea
                id="message"
                className="materialize-textarea"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
              <label htmlFor="message" className="active">
                Why I want to read it:{" "}
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col l2 offset-l2 m3 offset-m2">
              {this.handleSubmitBtn()}
            </div>
            <div className="m3">{this.cancelForm()}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default HandleBook;
