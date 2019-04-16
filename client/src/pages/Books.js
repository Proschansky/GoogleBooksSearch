import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    query: '',
    books: {}
  };

  constructor(props){
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleInputChange = event => {
    let value = event.target.value;
    
    this.setState({
      query: value
    });
    console.log(this.state.query)
  };

  handleFormSubmit = async (event )=>{
    event.preventDefault();
    const query = this.state.query;
    const URL = "https://www.googleapis.com/books/v1/volumes?q="+ query;

    await fetch(URL, { method: 'GET'})
      .then(response => console.log(response.json()))
      .catch(err => console.log(err))
  }


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
                value={this.state.query}
                onChange={this.handleInputChange}
                name="Book"
                placeholder="Search for a Book!"
              />
              <FormBtn
                onClick={()=>this.handleFormSubmit()}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
          <>
            {Booklist}
          </>
      </Container>
             
     )

  }
}

export default Books;
