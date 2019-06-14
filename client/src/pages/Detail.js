import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {

    const {
      title,
      authors,
      image,
      link,
      description
    } = this.state.book;

    return (
      <div>
        <Jumbotron>
          <h1>
            {title} by {authors ? authors.join(", ") : "No Author"}
          </h1>
        </Jumbotron>
      <Container>
        <Row>
          <Col size="md-auto">
            <img src={image} alt={title} /><br/><br/>
          </Col>
          <Col size="md-10">
            <article>
              <h5>Description</h5>
              <p>
                {description}
              </p>
              <a href={link} target="_blank">View on Google Books</a><br /><br />
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-10">
            <Link to="/saved">← Back to Saved Articles</Link>
          </Col>
        </Row>
      </Container>
    </div>
    );
  }
}

export default Detail;
