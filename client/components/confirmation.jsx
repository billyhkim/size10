import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CheckoutSummaryItem from './checkout-summary-item';

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomeView = this.handleHomeView.bind(this);
  }
  handleHomeView() {
    this.props.setView('landing', {});
  }
  render() {
    const cartItems = this.props.order.cart.map((cartItem, index) => <CheckoutSummaryItem key={index} cartItem={cartItem}/>);
    let orderQuantities = this.props.order.cart.reduce((total, product) => {
      total += product.quantity;
      return total;
    }, 0);
    const totalCartPrice = this.props.order.cart.reduce((acc, cur) => {
      acc += cur.price * cur.quantity;
      return acc;
    }, 0);
    const taxedTotal = (totalCartPrice / 100 * 0.0775).toFixed(2);
    const totalPrice = (parseFloat(totalCartPrice / 100) + 10 + parseFloat(taxedTotal)).toFixed(2);
    return (
      <React.Fragment>
        <Container className="text-center mb-4">
          <div className="h2 header-font mt-4 mb-3">🙌 Thank you for demoing size10! 🏀</div>
          <i className="fas fa-check-circle fa-8x mb-3 text-success"></i>
          <div className="h2 card-font mb-1">Confirmation #: {this.props.order.clientInfo.orderId}</div>
          <div className="h3 card-font mb-1">Order Total: ${totalPrice}</div>
          <div className="h3 card-font mb-1">{orderQuantities} Item(s)</div>
          <Row>
            <Col sm="6">
              <hr/>
              <div className="h5 card-font">1. Shipping Info</div>
              <div className="h5 card-font">{this.props.order.clientInfo.name}</div>
              <div className="h5 card-font">{this.props.order.clientInfo.address}</div>
              <div className="h5 card-font">{this.props.order.clientInfo.phone}</div>
              <div className="h5 card-font">{this.props.order.clientInfo.email}</div>
              <div className="h5 card-font">2. Billing Info</div>
              <div className="h5 card-font">Credit Card (last 4 digits):  {this.props.order.clientInfo.creditCard.substr(-4, 4)}</div>
            </Col>
            <Col sm="6">
              {cartItems}
            </Col>
          </Row>
          <hr/>
          <button type="button" className="btn btn-lg btn-warning btn-block card-font" onClick={this.handleHomeView}>BACK HOME</button>
        </Container>
        <img className="banner-image" src="./media/thankyoubanner.jpg" alt="Thank you banner image"/>
      </React.Fragment>
    );
  }
}
