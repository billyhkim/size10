import React from 'react';
import { CardImg, Button, Col, Row, Container } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: this.props.item, quantity: 1 };
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
            <Col sm="5" className="m-auto">
              <div className="card-font text-center mb-4">
                <div className="h4 text-muted mb-4">{this.state.product.brand} {this.state.product.name}</div>
                <div className="h2 mb-4">{(this.state.product.colorway).toUpperCase()}</div>
                <div className="h4 text-muted mb-4">{'$' + (this.state.product.price / 100).toFixed(2)}</div>
                <div className="h4 text-primary mb-4">IN STOCK</div>
                <Button onClick={this.handleAddClick}>ADD TO CART</Button>
              </div>
            </Col>
          </Row>
          <hr/>
          <div className="h6 description-font text-muted">Product Description</div>
          <hr/>
          <div className="h5 description-font">{this.state.product.description}</div>
          <hr/>
          <Row>
            <Button className="text-center m-auto" onClick={this.handleBackClick}>Back to Catalog</Button>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
