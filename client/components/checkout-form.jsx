import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Button, Card, CardBody, CardHeader, CardText, Col, Container, FormFeedback, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
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
      ccExpiration: '',
      cvv: '',
      validate: {
        nameState: '',
        addressState: '',
        emailState: '',
        phoneState: '',
        creditCardState: '',
        ccExpirationState: '',
        cvvState: ''
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
    this.validateExpiration = this.validateExpiration.bind(this);
    this.onChangeExpiration = this.onChangeExpiration.bind(this);
    this.validateCvv = this.validateCvv.bind(this);
    this.onChangeCvv = this.onChangeCvv.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    const orderConfirmId = Math.random().toString(36).substr(2, 9).toUpperCase();
    this.setState({ orderId: orderConfirmId });
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
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
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
  validateExpiration(e) {
    const expirationRegex = /^(1[0-2]|0[1-9]|\d)\/([2-9]\d[1-9]\d|[1-9]\d)$/;
    const { validate } = this.state;
    if (expirationRegex.test(e.target.value)) {
      validate.ccExpirationState = 'has-success';
    } else {
      validate.ccExpirationState = 'has-danger';
    }
    this.setState({ validate });
  }
  validateCvv(e) {
    const cvvRegex = /^[0-9]{3,4}$/;
    const { validate } = this.state;
    if (cvvRegex.test(e.target.value)) {
      validate.cvvState = 'has-success';
    } else {
      validate.cvvState = 'has-danger';
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
  onChangeExpiration(e) {
    this.handleInputChange(e);
    this.validateExpiration(e);
  }
  onChangeCvv(e) {
    this.handleInputChange(e);
    this.validateCvv(e);
  }
  handleCartClick(e) {
    e.preventDefault();
    this.props.setView('cart', {});
  }
  handleSubmit(e) {
    e.preventDefault();
    const clientInfo = {
      orderId: this.state.orderId,
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      phone: this.state.phone,
      creditCard: this.state.creditCard
    };
    this.props.sendClientDetails(clientInfo);
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
    const submitBtnBasedOnFormCompletion = (this.state.validate.nameState && this.state.validate.addressState && this.state.validate.emailState && this.state.validate.phoneState && this.state.validate.creditCardState && this.state.validate.ccExpirationState && this.state.validate.cvvState) === 'has-success' ? <button type="button" className="btn btn-lg btn-success btn-block card-font" onClick={this.handleSubmit}>CONFIRM SHIPPING & BILLING</button> : <button type="button" className="btn btn-lg btn-danger btn-block card-font">INPUT SHIPPING & BILILNG INFO</button>;
    return (
      <React.Fragment>
        <Container className="mt-4 mb-5">
          <div className="h1 text-center card-font mb-4">CHECKOUT</div>
          <Row>
            <Col sm="7">
              <Card className="mb-2">
                <CardHeader className="h3 card-font text-white" style={{ backgroundColor: '#333', borderColor: '#333' }}>1. SHIPPING</CardHeader>
                <CardBody>
                  <CardText>Shipping + Billing Address <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip1"/></CardText>
                  <ReactTooltip id="tooltip1" place="right" type="dark" effect="solid">
                    <span className="font-weight-bold">Note: This is a demo please do not input actual information</span>
                  </ReactTooltip>
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
                    <FormFeedback invalid>Please enter a valid 10-digit phone number.</FormFeedback>
                  </InputGroup>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardHeader className="h3 card-font text-white" style={{ backgroundColor: '#333', borderColor: '#333' }}>2. BILLING</CardHeader>
                <CardBody>
                  <CardText>Credit Card Information <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip2"/></CardText>
                  <ReactTooltip id="tooltip2" place="right" type="dark" effect="solid">
                    <span className="font-weight-bold">Note: This is a demo please do not input actual billing or CC information</span>
                  </ReactTooltip>
                  <InputGroup className="mb-1">
                    <Input placeholder="Credit Card No." name="creditCard" valid={ this.state.validate.creditCardState === 'has-success' } invalid={ this.state.validate.creditCardState === 'has-danger' } onChange={this.onChangeCreditCard} />
                    <FormFeedback invalid>Please enter a valid 16-digit credit card number (no dashes).</FormFeedback>
                  </InputGroup>
                  <InputGroup className="mb-1">
                    <Input placeholder="Expiration Date (ex. 01/20 or 1/2020)" name="ccExpiration" valid={ this.state.validate.ccExpirationState === 'has-success' } invalid={ this.state.validate.ccExpirationState === 'has-danger' } onChange={this.onChangeExpiration} />
                    <FormFeedback invalid>Please enter a valid expiration date (mm/yy or mm/yyyy).</FormFeedback>
                  </InputGroup>
                  <InputGroup className="">
                    <Input placeholder="CVV" name="cvv" valid={ this.state.validate.cvvState === 'has-success' } invalid={ this.state.validate.cvvState === 'has-danger' } onChange={this.onChangeCvv} />
                    <FormFeedback invalid>Please enter a valid 3 or 4 digit CVV (back of card).</FormFeedback>
                  </InputGroup>
                </CardBody>
              </Card>
            </Col>
            <Col sm="5">
              <div className="h3 card-font">IN YOUR CART</div>
              <span className="h6 description-font text-muted">{orderQuantities} item(s)</span>
              <hr/>
              <div className="h6 description-font">Subtotal:
                <span className="float-right">${(totalCartPrice / 100).toFixed(2)}</span></div>
              <div className="h6 description-font">Shipping: <i className="fas fa-question-circle pointer-hover  text-warning" href="#" data-tip data-for="tooltip3"/>
                <ReactTooltip id="tooltip3" place="right" type="dark" effect="solid">
                  <span className="font-weight-bold">Shipping is set at a flat-rate of $10</span>
                </ReactTooltip>
                <span className="float-right">${(10).toFixed(2)}</span>
              </div>
              <div className="h6 description-font mb-4">Tax: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip4"/>
                <span className="float-right">${taxedTotal}</span>
                <ReactTooltip id="tooltip4" place="right" type="dark" effect="solid">
                  <span className="font-weight-bold">Sales tax is based on Orange County, CA&apos;s rate of 7.75%</span>
                </ReactTooltip>
              </div>
              <hr/>
              <div className="h4 card-font mb-4 text-orange">TOTAL : <span className="float-right">${totalPrice}</span></div>
              <button type="button" className="btn btn-lg btn-secondary btn-block card-font" onClick={this.handleCartClick}>BACK TO CART</button>
              {submitBtnBasedOnFormCompletion}
              {cartItems}
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="card-font" toggle={this.toggle}><i className="fas fa-exclamation-circle text-warning"></i> FINAL CONFIRMATION</ModalHeader>
          <ModalBody>
            <div className="container mb-3 text-center description-font font-weight-bold">Would you like to submit your order?</div>
            <Container>
              <Row>
                <Col>
                  <div className="card-font">1. SHIPPING</div>
                  <div className="description-font">{this.state.name}</div>
                  <div className="description-font">{this.state.address}</div>
                  <div className="description-font">{this.state.email}</div>
                  <div className="description-font">{this.state.phone}</div>
                </Col>
                <Col>
                  <div className="card-font">2. BILLING</div>
                  <div className="description-font">CC #: {this.state.creditCard}</div>
                  <div className="description-font">Exp.: {this.state.ccExpiration}</div>
                  <div className="description-font">CVV: {this.state.cvv}</div>
                </Col>
              </Row>
            </Container>
            <hr/>
            <div className="h3 card-font text-center font-weight-bold">Order Total: ${totalPrice}</div>
            <div className="description-font text-muted text-center">{orderQuantities} item(s)</div>
            <div className="align-content-center">
              {cartItems}
            </div>

          </ModalBody>
          <ModalFooter className="card-font">
            <Button color="secondary" onClick={this.toggle}>RETURN TO CHECKOUT</Button>{' '}
            <Button color="success" onClick={this.handleOrder}>SUBMIT ORDER</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
