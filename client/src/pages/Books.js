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
import socketIOClient from "socket.io-client";

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
    savedBooks: [],
    title: "",
    endpoint: "https://stark-sands-82717.herokuapp.com/",
    response: false
  };

  componentDidMount() {
    this.loadBooks(); // get all books from DB
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data.title }));
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ savedBooks: res.data }))
      .catch(err => console.log(err));
  };

  saveBook = index => {

    const data = {
      ...this.state.books[index]
    };

    API.saveBook(data)
      .then(res => {
        //console.log("res",res);

        const books = this.state.books;
        books[index]._id = res.data._id;
        this.setState({ books });
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit("FromAPI",{ title: books[index].title });
        
      })
      .catch(err => console.log(err));
  };

  deleteBook = (id,index) => {
    API.deleteBook(id)
      .then(res => {
        this.loadBooks();

        // Update state on removal
        const books = this.state.books;
        delete books[index]._id;
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

          // create an array of all the data we need
          const books = res.data.items.map(data => {
            const book = {};
            let bookImage = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : '';
            book.id = data.id;
            const checkId = obj => obj.id === book.id;
            const alreadySaved = this.state.savedBooks.filter(checkId);
            if(alreadySaved.length){
              //console.log("alreadySaved",alreadySaved);
              book._id = alreadySaved[0]._id;
            }       
            book.title = data.volumeInfo.title;
            book.authors = data.volumeInfo.authors;
            book.description = data.volumeInfo.description;
            book.image = bookImage;
            book.link = data.volumeInfo.infoLink;
            return book;
          });

          
          //console.log("book",books);

          this.setState({
            title: '', // empty search
            books
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {

    const socket = socketIOClient(this.state.endpoint);

    return (
      <div>
         <Jumbotron>
              <h1>
                What Books Should I Read?
                {this.state.response ? "received" : "..."}
              </h1>
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
                          
                          {book._id ?
                            <DeleteBtn onClick={() => this.deleteBook(book._id,index)} /> : ""
                          }
                          
                          {book._id ? 
                            <Link style={viewBook} to={"/detail/" + book._id}> <i className="fa fa-eye"></i>  View</Link> :
                            <SaveBtn onClick={() => this.saveBook(index)} />
                          }
                          

                          <h3>
                            {book.title}
                          </h3>
                          <p>
                            Author(s): <em>{book.authors ? book.authors.join(", ") : 'No Authors'}</em>
                          </p>
                          <br />
                        </Col>
                      </Row>
                      <Row>`
                        <Col size="md-auto sm-10">
                          {book.image ? <img src={book.image} alt="" /> : <div className="noImage">No Image</div> }
                          <br /><br />
                        </Col>
                        <Col size="md-10 sm-10">
                        
                          <p>
                            <strong>Description:</strong><br /> {
                              book.description ? 
                              book.description.length > 300 ?  
                              book.description.substring(0,300)+"..." :
                              book.description
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
