import React from 'react';

export default class CheckoutSummaryItem extends React.Component {
  render() {
    return (
      <div className="mt-3 mb-3">
        <hr/>
        <div className="row align-items-center mt-1 mb-1">
          <img src={this.props.cartItem.image} alt="" className="col-sm-5 mx-auto"/>
          <div className="col-sm-7">
            <div className="h6 card-font">{this.props.cartItem.name}</div>
            <div className="h6 card-font text-muted">{this.props.cartItem.colorway}</div>
            <div className="h6 description-font text-muted">${(this.props.cartItem.price / 100).toFixed(2)}</div>
            <div className="h6">Quantity: {this.props.cartItem.quantity}</div>
          </div>
        </div>
      </div>
    );
  }
}
