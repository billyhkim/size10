import React from 'react';
import { Container, Col, Row } from 'reactstrap';

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
          <button type="button" className="col-sm-5 btn btn-lg btn-danger btn-block description-font mt-4" onClick={this.handleCatalogView}><i className="fas fa-shoe-prints fa-lg pointer-hover"></i>SHOES</button>
          <button type="button" className="col-sm-5 btn btn-lg btn-danger btn-block description-font">ABOUT</button>
        </Container>
      </div>
    );
  }
}
