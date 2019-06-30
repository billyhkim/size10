import React from 'react';
import { CardImg, Button, Col, Row, Container } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: this.props.item, quantity: 1 };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
  }
  handleBackClick(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  handleAddClick(e) {
    e.preventDefault();
    this.props.addToCart(this.state.product, this.state.quantity);
  }
  decrementQuantity(e) {
    e.preventDefault();
    if (this.state.quantity === 1) {
      return;
    }
    this.setState({ quantity: this.state.quantity - 1 });
  }
  incrementQuantity(e) {
    e.preventDefault();
    this.setState({ quantity: this.state.quantity + 1 });
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
              <div className="card-font text-center">
                <div className="h4 text-muted mb-3">{this.state.product.brand} {this.state.product.name}</div>
                <div className="h2 mb-3">{(this.state.product.colorway).toUpperCase()}</div>
                <div className="h4 text-muted mb-3">{'$' + (this.state.product.price / 100).toFixed(2)}</div>
                <div className="h4 text-primary mb-4">IN STOCK</div>
                <div className="h5 mb-2">Quantity:</div>
                <div className="h4 mb-4"><i className="fas fa-minus-square pointer-hover ml-3 mr-4" onClick={this.decrementQuantity}></i>{this.state.quantity}<i className="fas fa-plus-square pointer-hover ml-4 mr-3" onClick={this.incrementQuantity}></i></div>
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
            <Button className="text-center m-auto" onClick={this.handleBackClick}><i className="fas fa-arrow-alt-circle-left pointer-hover"></i></Button>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
