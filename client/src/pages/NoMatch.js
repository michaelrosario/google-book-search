import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
    <div>
      <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
      </Jumbotron>
      <Container>
      <Row>
        <Col size="md-12">
          
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default NoMatch;
