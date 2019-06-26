import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: { name: 'catalog', params: {} }
    };
    this.setView = this.setView.bind(this);
  }
  componentDidMount() {
    this.getProducts();
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
  render() {
    const nameState = this.state.view.name;
    switch (nameState) {
      case 'catalog':
        return (
          <React.Fragment>
            <Header setView={this.setView}/>
            <ProductList products={this.state.products} setView={this.setView}/>
          </React.Fragment>
        );
      case 'details':
        return (
          <div>
          </div>
        );
      case 'cart':
        return (
          <div>
          </div>
        );
      case 'checkout':
        return (
          <div>
          </div>
        );
    }
  }
}
