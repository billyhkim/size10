import React from 'react';
import { Row } from 'reactstrap';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  render() {
    const items = this.props.products.map(item => <ProductListItem key={item.id} item={item} setView={this.props.setView}/>);
    return (
      <Row className="justify-content-md-center mr-1 ml-1">
        {items}
      </Row>
    );
  }
}
