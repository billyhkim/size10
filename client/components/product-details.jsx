import React from 'react';
import { Card, CardImg, CardBody, CardSubtitle, CardText, Button, Col, Row, Container } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: this.props.item };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }
  handleBackClick(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  handleAddClick(e) {
    e.preventDefault();
    this.props.addToCart(this.state.product);
  }
  render() {
    if (this.state.product) {
      return (
        <Container className="mt-2 mb-4">
          <Row>
            <Col sm="7">
              <CardImg width="100%" src={this.state.product.image} alt={this.state.product.name} />
            </Col>
            <Col sm="5">
              <Card className="card-font text-center mb-4 mx-auto">
                <CardBody>
                  <CardSubtitle className="h5 text-muted mb-4">{this.state.product.brand} {this.state.product.name}</CardSubtitle>
                  <CardSubtitle className="h2 mb-4">{(this.state.product.colorway).toUpperCase()}</CardSubtitle>
                  <CardSubtitle className="h5 text-muted mb-4">{'$' + (this.state.product.price / 100).toFixed(2)}</CardSubtitle>
                  <CardText className="h6 text-muted description-font">{this.state.product.description}</CardText>
                </CardBody>
                <Button onClick={this.handleAddClick}>ADD TO CART</Button>
              </Card>
              <Button className="text-center mx-auto" onClick={this.handleBackClick}>Back to Catalog</Button>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
