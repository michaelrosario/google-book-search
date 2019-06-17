import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import socketIOClient from 'socket.io-client';
import 'font-awesome/css/font-awesome.min.css';
import { NONAME } from "dns";

const viewBook = {
  padding: '6px 20px',
  margin: '0 10px',
  border: '1px solid #999',
  borderRadius: '4px',
  float: 'right',
  textDecoration: 'none'
}

class Saved extends Component {
  state = {
    books: [],
    alert,
    endpoint: "/"
  };

  componentDidMount() {
    this.loadBooks(); // get all books from DB  
    const socket = socketIOClient(this.state.endpoint, { secure: true });
    socket.on('fromServer', title => {
      //console.log("fromServer",title.data);
      this.showAlert(title.data);
    }); 
  }

  showAlert = message => {
    //console.log("message",message);
    this.loadBooks(); 
    this.setState({ alert: message });
    setInterval(() => {
      this.setState({ alert: "" });
    }, 3000);
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
         <Jumbotron>
              <h1>What Books Should I Read?</h1>
        </Jumbotron>
     
        <Container style={{ maxWidth: 1300 }}>
          <Row>
            <Col size="md-12 sm-12">
            <h5>Saved Books</h5>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={'book'+book._id}>
                      <Row>
                        <Col size="sm-12">
                          <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                          <Link style={viewBook} to={"/detail/" + book._id}>
                            <i className="fa fa-eye"></i>  View
                          </Link>
                          <h4>
                            {book.title}
                          </h4>
                          <p>
                            Author(s): <em>{book.authors.length ? book.authors.join(", ") : "No Authors"}</em>
                          </p>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col size="sm-auto">
                          {book.image ? <img src={book.image} alt="" /> : <div className="noImage">No Image</div> }
                          <br /><br />
                        </Col>
                        <Col size="sm-10">
                         
                          <p>
                            <strong>Description:</strong><br /> {
                              book.description ? 
                                book.description.length > 300 ? 
                                book.description.substring(0,300)+"..." : 
                                book.description : "No Description"}
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
      <Message message={this.state.alert}  />
    </div>
    );
  }
}

export default Saved;
