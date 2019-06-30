import React from 'react';
import { Container, Col, Row, Button } from 'reactstrap';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.handleCatalogView = this.handleCatalogView.bind(this);
  }
  handleCatalogView(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  render() {
    return (
      <div className="landing-background">
        <Container>
          <Row>
            <Col sm="4" className="h1 header-font pt-5">We&apos;re size10</Col>
          </Row>
          <Row>
            <Col sm="5" className="h3 card-font pt-3 landing-quote">&quot;To wear dreams on one’s feet is to begin to give a reality to one’s dreams.&quot;<br/></Col>
          </Row>
          <Row>
            <Col sm="5" className="h4 card-font text-white">Roger Vivier</Col>
          </Row>
          <Row className="mt-3">
            <Button color="danger" className="ml-3" onClick={this.handleCatalogView}>SHOES</Button>
            <Button color="danger" className="ml-2">ABOUT</Button>
          </Row>
        </Container>
      </div>
    );
  }
}
