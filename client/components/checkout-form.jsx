import React from 'react';
import { Card, CardHeader, CardBody, CardText, InputGroup, Input, FormFeedback, Row, Col, Container, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import CheckoutSummaryItem from './checkout-summary-item';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      creditCard: '',
      validate: {
        nameState: '',
        addressState: '',
        emailState: '',
        phoneState: '',
        creditCardState: ''
      },
      modal: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateName = this.validateName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.validateAddress = this.validateAddress.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.validateCreditCard = this.validateCreditCard.bind(this);
    this.onChangeCreditCard = this.onChangeCreditCard.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  validateName(e) {
    const nameRegex = /[A-Za-z0-9]/;
    const { validate } = this.state;
    if (nameRegex.test(e.target.value)) {
      validate.nameState = 'has-success';
    } else {
      validate.nameState = 'has-danger';
    }
    this.setState({ validate });
  }
  validateAddress(e) {
    const addressRegex = /[A-Za-z0-9]/;
    const { validate } = this.state;
    if (addressRegex.test(e.target.value)) {
      validate.addressState = 'has-success';
    } else {
      validate.addressState = 'has-danger';
    }
    this.setState({ validate });
  }
  validateEmail(e) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    const { validate } = this.state;
    if (emailRegex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
    this.setState({ validate });
  }
  validatePhone(e) {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    const { validate } = this.state;
    if (phoneRegex.test(e.target.value)) {
      validate.phoneState = 'has-success';
    } else {
      validate.phoneState = 'has-danger';
    }
    this.setState({ validate });
  }
  validateCreditCard(e) {
    const creditCardRegex = /^[0-9]{16}$/;
    const { validate } = this.state;
    if (creditCardRegex.test(e.target.value)) {
      validate.creditCardState = 'has-success';
    } else {
      validate.creditCardState = 'has-danger';
    }
    this.setState({ validate });
  }
  onChangeName(e) {
    this.handleInputChange(e);
    this.validateName(e);
  }
  onChangeAddress(e) {
    this.handleInputChange(e);
    this.validateAddress(e);
  }
  onChangeEmail(e) {
    this.handleInputChange(e);
    this.validateEmail(e);
  }
  onChangePhone(e) {
    this.handleInputChange(e);
    this.validatePhone(e);
  }
  onChangeCreditCard(e) {
    this.handleInputChange(e);
    this.validateCreditCard(e);
  }
  handleCartClick(e) {
    e.preventDefault();
    this.props.setView('cart', {});
  }
  handleSubmit(e) {
    e.preventDefault();
    const orderConfirmId = Math.random().toString(36).substr(2, 9).toUpperCase();
    this.setState({ orderId: orderConfirmId }, this.props.sendOrderDetails(orderConfirmId, this.props.cart));
    this.toggle();
  }
  handleOrder(e) {
    e.preventDefault();
    this.toggle();
    this.props.placeOrder(this.state.orderId, this.state.name, this.state.address, this.state.email, this.state.phone, this.state.creditCard);
    this.props.setView('confirmation', {});
  }
  render() {
    const cartItems = this.props.cart.map((cartItem, index) => <CheckoutSummaryItem key={index} cartItem={cartItem} setView={this.props.setView}/>);
    let orderQuantities = this.props.cart.reduce((total, product) => {
      total += product.quantity;
      return total;
    }, 0);
    const totalCartPrice = this.props.cart.reduce((acc, cur) => {
      acc += cur.price * cur.quantity;
      return acc;
    }, 0);
    const taxedTotal = (totalCartPrice / 100 * 0.0775).toFixed(2);
    const totalPrice = (parseFloat(totalCartPrice / 100) + 10 + parseFloat(taxedTotal)).toFixed(2);
    const submitBtnBasedOnFormCompletion = (this.state.validate.nameState && this.state.validate.addressState && this.state.validate.emailState && this.state.validate.phoneState && this.state.validate.creditCardState) === 'has-success' ? <button type="button" className="btn btn-lg btn-warning btn-block card-font" onClick={this.handleSubmit}>SUBMIT ORDER</button> : <button type="button" className="btn btn-lg btn-warning btn-block card-font">PLEASE COMPLETE FORM TO SUBMIT</button>;
    return (
      <React.Fragment>
        <Container className="mt-4 mb-4">
          <div className="h1 text-center card-font mb-4">CHECKOUT</div>
          <Row>
            <Col sm="7">
              <Card className="mb-2">
                <CardHeader className="h3 card-font text-white" style={{ backgroundColor: '#333', borderColor: '#333' }}>1. SHIPPING</CardHeader>
                <CardBody>
                  <CardText>Shipping + Billing Address</CardText>
                  <InputGroup className="mb-1">
                    <Input placeholder="Name" name="name" valid={ this.state.validate.nameState === 'has-success' } invalid={ this.state.validate.nameState === 'has-danger' } onChange={this.onChangeName} />
                    <FormFeedback invalid>Please enter your name.</FormFeedback>
                  </InputGroup>
                  <InputGroup className="mb-1">
                    <Input placeholder="Shipping Address" name="address" valid={ this.state.validate.addressState === 'has-success' } invalid={ this.state.validate.addressState === 'has-danger' } onChange={this.onChangeAddress} />
                    <FormFeedback invalid>Please enter your address.</FormFeedback>
                  </InputGroup>
                  <InputGroup className="mb-1">
                    <Input placeholder="E-Mail" name="email" valid={ this.state.validate.emailState === 'has-success' } invalid={ this.state.validate.emailState === 'has-danger' } onChange={this.onChangeEmail} />
                    <FormFeedback invalid>Please enter a valid e-mail address.</FormFeedback>
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder="Phone Number" name="phone" valid={ this.state.validate.phoneState === 'has-success' } invalid={ this.state.validate.phoneState === 'has-danger' } onChange={this.onChangePhone} />
                    <FormFeedback invalid>Please enter a 10-digit phone number (with dashes).</FormFeedback>
                  </InputGroup>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardHeader className="h3 card-font text-white" style={{ backgroundColor: '#333', borderColor: '#333' }}>2. BILLING</CardHeader>
                <CardBody>
                  <CardText>Billing Information</CardText>
                  <InputGroup>
                    <Input placeholder="Credit Card No." name="creditCard" valid={ this.state.validate.creditCardState === 'has-success' } invalid={ this.state.validate.creditCardState === 'has-danger' } onChange={this.onChangeCreditCard} />
                    <FormFeedback invalid>Please enter a valid 16-digit credit card number (no dashes).</FormFeedback>
                  </InputGroup>
                </CardBody>
              </Card>
            </Col>
            <Col sm="5">
              <div className="h3 card-font">IN YOUR CART</div>
              <span className="h6 description-font text-muted">{orderQuantities} item(s)</span>
              <hr/>
              <div className="h6 description-font">Subtotal: <span className="float-right">${(totalCartPrice / 100).toFixed(2)}</span></div>
              <div className="h6 description-font">Shipping: <span className="float-right">${(10).toFixed(2)}</span></div>
              <div className="h6 description-font mb-4">Tax: <span className="float-right">${taxedTotal}</span></div>
              <hr/>
              <div className="h4 card-font mb-4 text-orange">TOTAL : <span className="float-right">${totalPrice}</span></div>
              {cartItems}
              <button type="button" className="btn btn-lg btn-secondary btn-block card-font" onClick={this.handleCartClick}>BACK TO CART</button>
              {submitBtnBasedOnFormCompletion}
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="card-font" toggle={this.toggle}><i className="fas fa-exclamation-circle text-warning"></i> FINAL CONFIRMATION</ModalHeader>
          <ModalBody>
            <div className="container align-items-center mt-1 mb-1 description-font">Would you like to submit your order?</div>
          </ModalBody>
          <ModalFooter className="card-font">
            <Button color="secondary" onClick={this.toggle}>RETURN TO CHECKOUT</Button>{' '}
            <Button color="warning" onClick={this.handleOrder}>SUBMIT ORDER</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
