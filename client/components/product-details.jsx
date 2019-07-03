import React from 'react';
import { CardImg, Button, Col, Row, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.item,
      quantity: 1,
      modal: false
    };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  handleBackClick(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  handleAddClick(e) {
    e.preventDefault();
    this.toggle();
    this.props.addToCart(this.state.product, this.state.quantity);
  }
  handleContinueClick(e) {
    e.preventDefault();
    this.setState({ quantity: 1 });
    this.toggle();
    this.props.setView('catalog', {});
  }
  handleCartClick(e) {
    e.preventDefault();
    this.setState({ quantity: 1 });
    this.toggle();
    this.props.setView('cart', {});
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
        <React.Fragment>
          <Container className="mt-2 mb-4">
            <Row>
              <Col sm="7">
                <CardImg width="100%" src={this.state.product.image} alt={this.state.product.name} />
              </Col>
              <Col sm="5" className="m-auto">
                <div className="card-font text-center">
                  <div className="h4 text-muted mb-3">{this.state.product.name}</div>
                  <div className="h2 mb-3">{(this.state.product.colorway).toUpperCase()}</div>
                  <div className="h4 text-muted mb-3">{'$' + (this.state.product.price / 100).toFixed(2)}</div>
                  <div className="h4 text-primary mb-3">IN STOCK</div>
                  <div className="h5 mb-1">Quantity:</div>
                  <div className="h4 mb-4 noselect"><i className="fas fa-minus-square pointer-hover ml-3 mr-4" onClick={this.decrementQuantity}></i>{this.state.quantity}<i className="fas fa-plus-square pointer-hover ml-4 mr-3" onClick={this.incrementQuantity}></i></div>
                  <Button size="lg" color="warning" className="mb-2" onClick={this.handleAddClick}>ADD TO CART</Button>
                  <Button className="card-font d-block m-auto" onClick={this.handleBackClick}><i className="fas fa-arrow-alt-circle-left"></i> BACK TO CATALOG</Button>
                </div>
              </Col>
            </Row>
            <hr/>
            <div className="h6 description-font text-muted">Product Description</div>
            <hr/>
            <div className="h5 description-font">{this.state.product.description}</div>
            <hr/>
          </Container>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader className="card-font" toggle={this.toggle}><i className="fas fa-check-circle text-success"></i> ADDED TO CART</ModalHeader>
            <ModalBody>
              <div className="row align-items-center mt-1 mb-1">
                <img src={this.state.product.image} alt="" className="col-sm-5 mx-auto"/>
                <div className="col-sm-7 card-font">
                  <div className="h5">{this.state.product.name}</div>
                  <div className="h5 text-muted">{this.state.product.colorway}</div>
                  <div className="h6 description-font text-muted">${(this.state.product.price / 100).toFixed(2)} x {this.state.quantity} = ${((this.state.product.price / 100) * this.state.quantity).toFixed(2)}</div>
                  <div className="h5 mb-3">Quantity: {this.state.quantity}</div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className="card-font" color="success" onClick={this.handleContinueClick}>CONTINUE SHOPPING</Button>{' '}
              <Button className="card-font" color="secondary" onClick={this.handleCartClick}>GO TO CART</Button>
            </ModalFooter>
          </Modal>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
