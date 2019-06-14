import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import BooksAPI from "../utils/googleBooks";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

const viewBook = {
  padding: '6px 20px',
  margin: '0 10px',
  border: '1px solid #999',
  borderRadius: '4px',
  float: 'right',
  textDecoration: 'none'
}

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.nameInput.focus(); 
  }


  saveBook = index => {

    const book = this.state.books[index].volumeInfo;
    
    let bookImage = book.imageLinks.thumbnail || '';

    const data = {
      title: book.title,
      authors: book.authors,
      description: book.description,
      image: bookImage,
      link: book.infoLink
    };


    API.saveBook(data)
      .then(res => {
        //console.log("res",res);

        const books = this.state.books;
        books[index]._id = res.data._id;
        this.setState({ books });
        
      })
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
    if (this.state.title) {
      BooksAPI.searchBook(this.state.title)
        .then(res => {
          console.log("book",res.data.items);
          this.setState({
            title: '',
            books: res.data.items
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
         <Jumbotron>
              <h1>What Books Should I Read? {process.env.REACT_APP_NOT_SECRET_CODE}</h1>
        </Jumbotron>
     
      <Container style={{ maxWidth: 1300 }}>
       
        <Row>
          <Col size="md-12">
           
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search for a book..."
                ref={(input) => { this.nameInput = input; }} 
              />
              <FormBtn
                disabled={!this.state.title}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12 sm-12">
            <h5>Results</h5><br />
            {this.state.books.length ? (
              <List>
                {this.state.books.map((book,index) => (
                  <ListItem key={'book'+index}>
                    <Row>
                        <Col size="sm-12">
                          
                          {book._id ? <Link style={viewBook} to={"/detail/" + book._id}> <i className="fa fa-eye"></i>  View</Link> : ""}
                          <SaveBtn onClick={() => this.saveBook(index)} />

                          <h3>
                            {book.volumeInfo.title}
                          </h3>
                          <p>
                            Author(s): <em>{book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : 'No Authors'}</em>
                          </p>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col size="md-auto sm-10">
                          {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt="" /> : <div className="noImage">No Image</div> }
                          <br /><br />
                        </Col>
                        <Col size="md-10 sm-10">
                        
                          <p>
                            <strong>Description:</strong><br /> {
                              book.volumeInfo.description ? 
                              book.volumeInfo.description.length > 300 ?  
                              book.volumeInfo.description.substring(0,300)+"..." :
                              book.volumeInfo.description
                              : "No description..."}
                          </p>

                        </Col>
                      </Row>

                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Books;
