import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  render() {
    const items = this.props.products.map(item => <ProductListItem key={item.id} item={item} setView={this.props.setView}/>);
    return (
      <Container>
        <Row>
          {items}
        </Row>
      </Container>
    );
  }
}
