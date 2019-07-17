import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Col, Container, Row } from 'reactstrap';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }
  handleBackClick(e) {
    e.preventDefault();
    this.props.setView('catalog', {});
  }
  handleCheckout(e) {
    e.preventDefault();
    this.props.setView('checkout', {});
  }
  render() {
    const cartItems = this.props.cart.map((cartItem, index) => <CartSummaryItem key={index} cartItem={cartItem} change={this.props.change} removeFromCart={this.props.removeFromCart} setView={this.props.setView}/>);
    const emptyCartCheck = !this.props.cart.length ? <div className="h3 card-font mb-5"><hr/>There are no items in your cart.</div> : cartItems;
    const emptySummaryCheck = !this.props.cart.length ? 0.00 : 10.00;
    const noCheckoutBtnIfNoCartItems = !this.props.cart.length ? null : <button type="button" className="btn btn-lg btn-warning btn-block card-font" onClick={this.handleCheckout}>CHECKOUT</button>;
    let orderQuantities = this.props.cart.reduce((total, product) => {
      total += product.quantity;
      return total;
    }, 0);
    const totalCartPrice = this.props.cart.reduce((acc, cur) => {
      acc += cur.price * cur.quantity;
      return acc;
    }, 0);
    const taxedTotal = (totalCartPrice / 100 * 0.0775).toFixed(2);
    const totalPrice = (parseFloat(totalCartPrice / 100) + parseFloat(emptySummaryCheck) + parseFloat(taxedTotal)).toFixed(2);
    return (
      <Container className="mt-4 mb-4">
        <Row>
          <Col sm="7">
            <div className="h2 card-font">CART <span className="h6 description-font text-muted">{orderQuantities} item(s)</span></div>
            <b>{emptyCartCheck}</b>
          </Col>
          <Col sm="5">
            <div className="h2 card-font">SUMMARY</div>
            <hr/>
            <div className="h6 description-font">Subtotal: <span className="float-right">${(totalCartPrice / 100).toFixed(2)}</span></div>
            <div className="h6 description-font">Shipping: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip-cart1"/> <span className="float-right">${emptySummaryCheck.toFixed(2)}</span></div>
            <ReactTooltip id="tooltip-cart1" place="right" type="dark" effect="solid">
              <span className="font-weight-bold">Shipping is set at a flat-rate of $10</span>
            </ReactTooltip>
            <div className="h6 description-font mb-4">Tax: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip-cart2"/> <span className="float-right">${taxedTotal}</span></div>
            <ReactTooltip id="tooltip-cart2" place="right" type="dark" effect="solid">
              <span className="font-weight-bold">Sales tax is based on Orange County, CA&apos;s rate of 7.75%</span>
            </ReactTooltip>
            <hr/>
            <div className="h4 card-font mb-4">TOTAL : <span className="float-right">${totalPrice}</span></div>
            <button type="button" className="btn btn-lg btn-secondary btn-block card-font" onClick={this.handleBackClick}>BACK TO CATALOG</button>
            {noCheckoutBtnIfNoCartItems}
          </Col>
        </Row>
      </Container>
    );
  }
}
