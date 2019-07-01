import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.handleDetailClick = this.handleDetailClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.removeFromModal = this.removeFromModal.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  decrementQuantity(e) {
    e.preventDefault();
    if (this.props.cartItem.quantity === 1) {
      return;
    }
    this.props.change(this.props.cartItem.id, 'decrement');
  }
  incrementQuantity(e) {
    e.preventDefault();
    this.props.change(this.props.cartItem.id, 'increment');
  }
  handleDetailClick(e) {
    e.preventDefault();
    this.props.setView('details', { id: this.props.cartItem.id });
  }
  handleRemove(e) {
    e.preventDefault();
    this.toggle();
  }
  removeFromModal(e) {
    e.preventDefault();
    this.props.removeFromCart(this.props.cartItem.id);
    this.toggle();
  }
  render() {
    return (
      <React.Fragment>
        <div className="mt-3 mb-3">
          <hr/>
          <div className="row align-items-center mt-1 mb-1">
            <img src={this.props.cartItem.image} alt="" className="col-sm-5 mx-auto"/>
            <div className="col-sm-7">
              <div className="h4 card-font">{this.props.cartItem.name}</div>
              <div className="h5 card-font text-muted">{this.props.cartItem.colorway}</div>
              <div className="h5 description-font text-muted">${(this.props.cartItem.price / 100).toFixed(2)}</div>
              <div className="h5 mb-3">Quantity: <i className="fas fa-minus-square pointer-hover mr-2" onClick={this.decrementQuantity}></i>{this.props.cartItem.quantity}<i className="fas fa-plus-square pointer-hover ml-2" onClick={this.incrementQuantity}></i></div>
              <div>
                <a href="#" className="alert-link description-font mr-3" onClick={this.handleDetailClick}>Details</a>
                <a href="#" className="alert-link description-font" onClick={this.handleRemove}>Remove</a>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="card-font" toggle={this.toggle}><i className="fas fa-minus-circle text-danger"></i> REMOVE FROM CART?</ModalHeader>
          <ModalBody>
            <div className="row align-items-center mt-1 mb-1">
              <img src={this.props.cartItem.image} alt="" className="col-sm-5 mx-auto"/>
              <div className="col-sm-7 card-font">
                <div className="h5">{this.props.cartItem.name}</div>
                <div className="h5 text-muted">{this.props.cartItem.colorway}</div>
                <div className="h6 description-font text-muted">${(this.props.cartItem.price / 100).toFixed(2)} x {this.props.cartItem.quantity} = ${((this.props.cartItem.price / 100) * this.props.cartItem.quantity).toFixed(2)}</div>
                <div className="h5 mb-3">Quantity: {this.props.cartItem.quantity}</div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>KEEP IN CART</Button>
            <Button color="danger" onClick={this.removeFromModal}>REMOVE FROM CART</Button>{' '}
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
