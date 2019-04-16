import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    const books = this.state.books;
    let Booklist;

    if (books.length > 0) {
      Booklist = <Row><List>{books.items.map(item =>(<ListItem thumbnail={item.imageLinks.smallThumbnail} title={item.volumeInfo.title} summary={item.description} />) )}</List></Row>;
    } else {
      Booklist = <Row><p>Search for a book!</p></Row>
    }

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>React Google Books Search</h1>
              <h2>Search and Save Books of Interest</h2>
            </Jumbotron>
            <form>
              <h1>Book Search</h1>
              <br></br>
              <h3>Book</h3>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="Book"
                placeholder="Search for a Book!"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        < Booklist />
      </Container>
             
     )

  }
}

export default Books;
