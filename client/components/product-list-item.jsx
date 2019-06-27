import React from 'react';
import { Card, CardImg, CardBody, CardSubtitle, Button, Col } from 'reactstrap';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetView = this.handleSetView.bind(this);
  }
  handleSetView(e) {
    e.preventDefault();
    this.props.setView('details', { id: this.props.item.id });
  }
  render() {
    return (
      <Col sm="4" className="mt-2 mb-2 d-flex align-items-stretch">
        <Card className="card-font text-center">
          <CardImg top width="100%" src={this.props.item.image} alt={this.props.item.name} />
          <CardBody>
            <CardSubtitle className="h6 text-muted mb-1">{this.props.item.brand} {this.props.item.name}</CardSubtitle>
            <CardSubtitle className="h2 mb-1">{(this.props.item.colorway).toUpperCase()}</CardSubtitle>
            <CardSubtitle className="h5 text-muted mb-1">{'$' + (this.props.item.price / 100).toFixed(2)}</CardSubtitle>
            <Button onClick={this.handleSetView}>MORE INFO</Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
