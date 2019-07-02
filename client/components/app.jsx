import React from 'react';
import Header from './header';
import Landing from './landing';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Confirmation from './confirmation';
import About from './about';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: { name: 'landing', params: {} },
      cart: [],
      lastOrder: {
        clientInfo: {},
        cart: []
      }
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.changeQuantityFromCart = this.changeQuantityFromCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.grabClientDetailsForConfirmationPage = this.grabClientDetailsForConfirmationPage.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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
    fetch('./api/products.php', { method: 'GET' })
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
  grabClientDetailsForConfirmationPage(clientInfo) {
    this.setState({ lastOrder: { clientInfo, cart: JSON.parse(localStorage.cart) } });
  }
  placeOrder(orderId, name, address, email, phone, creditCard) {
    localStorage.clear();
    let currentCartSnapshot = [...this.state.cart];
    currentCartSnapshot.map(item => {
      delete item.description;
      delete item.image;
    });
    let orderDetails = {
      orderId,
      name,
      address,
      email,
      phone,
      creditCard,
      cart: JSON.stringify(currentCartSnapshot)
    };
    fetch('./api/orders.php', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(() => {
        localStorage.cart = JSON.stringify([]);
        this.setState({ cart: [] });
      })
      .catch(err => console.error('Order failed. Please try again: ', err));
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
          <React.Fragment>
            <Header setView={this.setView} cart={this.state.cart}/>
            <CheckoutForm setView={this.setView} cart={this.state.cart} sendClientDetails={this.grabClientDetailsForConfirmationPage} placeOrder={this.placeOrder}/>
          </React.Fragment>
        );
      case 'confirmation':
        return (
          <React.Fragment>
            <Header setView={this.setView} cart={this.state.cart}/>
            <Confirmation setView={this.setView} order={this.state.lastOrder}/>
          </React.Fragment>
        );
      case 'about':
        return (
          <React.Fragment>
            <Header setView={this.setView} cart={this.state.cart}/>
            <About setView={this.setView}/>
          </React.Fragment>
        );
    }
  }
}
