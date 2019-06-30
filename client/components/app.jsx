import React from 'react';
import Header from './header';
import Landing from './landing';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: { name: 'landing', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.changeQuantityFromCart = this.changeQuantityFromCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  componentDidMount() {
    this.getProducts();
    if (!localStorage.cart) {
      localStorage.cart = JSON.stringify(this.state.cart);
    } else {
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  setView(name, params) {
    const view = { name, params };
    this.setState({ view });
  }
  getProducts() {
    fetch('/api/products.php', { method: 'GET' })
      .then(res => res.json())
      .then(newRes => this.setState({ products: newRes }))
      .catch(err => console.error('Product retrieval failed. Please try again: ', err));
  }
  addToCart(productAsObject, productQuantity) {
    let cartSnapshot = JSON.parse(localStorage.getItem('cart'));
    let checkIfProductAdded = cartSnapshot.findIndex(itemIndex => {
      return itemIndex.id === productAsObject.id;
    });
    if (checkIfProductAdded > -1) {
      cartSnapshot[checkIfProductAdded].quantity += productQuantity;
    } else if (isNaN(productAsObject.quantity)) {
      productAsObject.quantity = productQuantity;
      cartSnapshot.push(productAsObject);
    } else {
      productAsObject.quantity = productAsObject.quantity + productQuantity;
      cartSnapshot.push(productAsObject);
    }
    this.setState({ cart: cartSnapshot });
    localStorage.cart = JSON.stringify(cartSnapshot);
  }
  changeQuantityFromCart(productId, change) {
    let cartSnapshot = JSON.parse(localStorage.getItem('cart'));
    let indexToChange = cartSnapshot.findIndex(item => {
      return item.id === productId;
    });
    change === 'increment' ? cartSnapshot[indexToChange].quantity++ : cartSnapshot[indexToChange].quantity--;
    this.setState({ cart: cartSnapshot });
    localStorage.cart = JSON.stringify(cartSnapshot);
  }
  removeFromCart(productId) {
    let cartSnapshot = JSON.parse(localStorage.getItem('cart'));
    let indexToRemove = cartSnapshot.findIndex(item => {
      return item.id === productId;
    });
    cartSnapshot.splice(indexToRemove, 1);
    this.setState({ cart: cartSnapshot });
    localStorage.cart = JSON.stringify(cartSnapshot);
  }
  render() {
    const nameState = this.state.view.name;
    switch (nameState) {
      case 'landing':
        return (
          <React.Fragment>
            <Header setView={this.setView} cart={this.state.cart}/>
            <Landing setView={this.setView}/>
          </React.Fragment>
        );
      case 'catalog':
        return (
          <React.Fragment>
            <Header setView={this.setView} cart={this.state.cart}/>
            <ProductList products={this.state.products} setView={this.setView}/>
          </React.Fragment>
        );
      case 'details':
        return (
          <React.Fragment>
            <Header setView={this.setView} cart={this.state.cart}/>
            <ProductDetails item={this.state.products[this.state.view.params.id - 1]} addToCart={this.addToCart} setView={this.setView}/>
          </React.Fragment>
        );
      case 'cart':
        return (
          <React.Fragment>
            <Header setView={this.setView} cart={this.state.cart}/>
            <CartSummary setView={this.setView} cart={this.state.cart} change={this.changeQuantityFromCart} removeFromCart={this.removeFromCart}/>
          </React.Fragment>
        );
      case 'checkout':
        return (
          <div>
          </div>
        );
    }
  }
}
